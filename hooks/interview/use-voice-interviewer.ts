'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { VoiceState, VoicePromptType } from '@/types/interview';
import { wsClient } from '@/lib/interview/websocket-client';

/**
 * useVoiceInterviewer Hook
 * 
 * Responsibilities:
 * - Play AI voice prompts
 * - Capture user voice (optional)
 * - Sync with hint system
 * - Auto-duck audio on execution
 */
export function useVoiceInterviewer(sessionId: string) {
    const [state, setState] = useState<VoiceState>({
        isSpeaking: false,
        transcript: '',
        lastPromptType: VoicePromptType.INTRO,
        isListening: false,
        volume: 0.7,
    });

    const audioRef = useRef<HTMLAudioElement | null>(null);

    /**
     * Play voice prompt
     */
    const playPrompt = useCallback((audioUrl: string, promptType: VoicePromptType) => {
        if (!audioRef.current) {
            audioRef.current = new Audio();
        }

        audioRef.current.src = audioUrl;
        audioRef.current.volume = state.volume;
        audioRef.current.play();

        setState((prev) => ({
            ...prev,
            isSpeaking: true,
            lastPromptType: promptType,
        }));

        audioRef.current.onended = () => {
            setState((prev) => ({ ...prev, isSpeaking: false }));
        };
    }, [state.volume]);

    /**
     * Set volume
     */
    const setVolume = useCallback((volume: number) => {
        setState((prev) => ({ ...prev, volume }));
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, []);

    /**
     * Mute/unmute
     */
    const toggleMute = useCallback(() => {
        if (audioRef.current) {
            audioRef.current.muted = !audioRef.current.muted;
        }
    }, []);

    /**
     * Stop current playback
     */
    const stop = useCallback(() => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            setState((prev) => ({ ...prev, isSpeaking: false }));
        }
    }, []);

    /**
     * Listen for voice prompts from server
     */
    useEffect(() => {
        const unsubscribe = wsClient.on<{ audioUrl: string; promptType: VoicePromptType; transcript: string }>(
            'voice:prompt',
            (data) => {
                playPrompt(data.audioUrl, data.promptType);
                setState((prev) => ({ ...prev, transcript: data.transcript }));
            }
        );

        return unsubscribe;
    }, [playPrompt]);

    /**
     * Auto-duck audio on execution
     */
    useEffect(() => {
        const unsubscribe = wsClient.on('execution:output', () => {
            if (state.isSpeaking && audioRef.current) {
                audioRef.current.volume = state.volume * 0.3; // Duck to 30%
            }
        });

        const unsubscribeComplete = wsClient.on('execution:complete', () => {
            if (audioRef.current) {
                audioRef.current.volume = state.volume; // Restore volume
            }
        });

        return () => {
            unsubscribe();
            unsubscribeComplete();
        };
    }, [state.isSpeaking, state.volume]);

    /**
     * Cleanup on unmount
     */
    useEffect(() => {
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    return {
        isSpeaking: state.isSpeaking,
        transcript: state.transcript,
        volume: state.volume,
        setVolume,
        toggleMute,
        stop,
    };
}
