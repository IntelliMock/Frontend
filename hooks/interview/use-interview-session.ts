'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
    InterviewSession,
    SessionStatus,
    CreateSessionResponse,
    ResumeSessionResponse,
    ApiResponse,
} from '@/types/interview';
import { wsClient } from '@/lib/interview/websocket-client';

/**
 * useInterviewSession Hook
 * 
 * Responsibilities:
 * - Create/resume interview sessions
 * - Server-authoritative timer synchronization
 * - Heartbeat mechanism (10s interval)
 * - Session status management
 * - Reconnection recovery
 */
export function useInterviewSession(sessionId?: string) {
    const router = useRouter();
    const [session, setSession] = useState<InterviewSession | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [timeRemaining, setTimeRemaining] = useState<number>(0);
    const [isConnected, setIsConnected] = useState(false);

    /**
   * Create new interview session
   */
    const createSession = useCallback(async (problemId: string) => {
        try {
            setIsLoading(true);
            setError(null);

            const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
            const response = await fetch(`${API_URL}/interview/start`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ problemId }),
            });

            const data: ApiResponse<CreateSessionResponse> = await response.json();

            if (!data.success || !data.data) {
                throw new Error(data.error || 'Failed to create session');
            }

            setSession(data.data.session);

            // Initialize WebSocket connection
            const token = localStorage.getItem('auth_token') || '';
            wsClient.connect(data.data.session.sessionId, token);

            // Navigate to interview room
            router.push(`/interview/${data.data.session.sessionId}`);

            return data.data;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Unknown error';
            setError(errorMessage);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [router]);

    /**
     * Resume existing session
     */
    const resumeSession = useCallback(async (id: string) => {
        try {
            setIsLoading(true);
            setError(null);

            const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
            const response = await fetch(`${API_URL}/interview/${id}`);
            const data: ApiResponse<ResumeSessionResponse> = await response.json();

            if (!data.success || !data.data) {
                throw new Error(data.error || 'Failed to resume session');
            }

            setSession(data.data.session);

            // Reconnect WebSocket
            const token = localStorage.getItem('auth_token') || '';
            wsClient.connect(id, token);

            return data.data;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Unknown error';
            setError(errorMessage);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    /**
     * Send heartbeat to server
     */
    const sendHeartbeat = useCallback(async () => {
        if (!session) return;

        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
            await fetch(`${API_URL}/interview/heartbeat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sessionId: session.sessionId }),
            });
        } catch (err) {
            console.error('Heartbeat failed:', err);
        }
    }, [session]);

    /**
     * End interview session
     */
    const endSession = useCallback(async () => {
        if (!session) return;

        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
            await fetch(`${API_URL}/interview/${session.sessionId}/end`, {
                method: 'POST',
            });

            setSession((prev) => prev ? { ...prev, status: SessionStatus.ENDED } : null);
            wsClient.disconnect();

            router.push(`/interview/${session.sessionId}/results`);
        } catch (err) {
            console.error('Failed to end session:', err);
        }
    }, [session, router]);

    /**
     * Initialize session on mount
     */
    useEffect(() => {
        if (sessionId) {
            resumeSession(sessionId);
        }
    }, [sessionId, resumeSession]);

    /**
     * Set up heartbeat interval (10s)
     */
    useEffect(() => {
        if (!session || session.status !== SessionStatus.ACTIVE) return;

        const heartbeatInterval = setInterval(sendHeartbeat, 10000);

        return () => clearInterval(heartbeatInterval);
    }, [session, sendHeartbeat]);

    /**
     * Server-authoritative timer
     */
    useEffect(() => {
        if (!session) return;

        const updateTimer = () => {
            const now = Date.now();
            const remaining = Math.max(0, session.endsAt - now);
            setTimeRemaining(remaining);

            // Auto-submit when timer expires
            if (remaining === 0 && session.status === SessionStatus.ACTIVE) {
                endSession();
            }
        };

        updateTimer();
        const timerInterval = setInterval(updateTimer, 1000);

        return () => clearInterval(timerInterval);
    }, [session, endSession]);

    /**
     * Listen to WebSocket connection status
     */
    useEffect(() => {
        const unsubscribe = wsClient.on<{ connected: boolean }>('connection:status', (data) => {
            setIsConnected(data.connected);
        });

        // Listen for session expiry
        const unsubscribeExpiry = wsClient.on('session:expired', () => {
            endSession();
        });

        return () => {
            unsubscribe();
            unsubscribeExpiry();
        };
    }, [endSession]);

    return {
        session,
        isLoading,
        error,
        timeRemaining,
        isConnected,
        createSession,
        resumeSession,
        endSession,
    };
}
