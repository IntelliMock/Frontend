'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { CodeSyncState, ProgrammingLanguage, WSMessageType } from '@/types/interview';
import { wsClient } from '@/lib/interview/websocket-client';
import { useDebounce } from '@/hooks/use-debounce';

/**
 * useCodeSync Hook
 * 
 * Responsibilities:
 * - Maintain Monaco editor state
 * - Debounced code synchronization (800ms)
 * - Versioned saves
 * - Restore code on reconnect
 * - Never block typing
 */
export function useCodeSync(sessionId: string, initialCode?: string) {
    const [state, setState] = useState<CodeSyncState>({
        code: initialCode || '',
        language: ProgrammingLanguage.CPP,
        isSyncing: false,
        version: 0,
    });

    const versionRef = useRef(0);
    const debouncedCode = useDebounce(state.code, 800);

    /**
     * Update code (called on every keystroke)
     */
    const setCode = useCallback((newCode: string) => {
        setState((prev) => ({
            ...prev,
            code: newCode,
        }));
    }, []);

    /**
     * Change programming language
     */
    const setLanguage = useCallback((language: ProgrammingLanguage) => {
        setState((prev) => ({
            ...prev,
            language,
        }));
    }, []);

    /**
     * Sync code to server (debounced)
     */
    const syncCode = useCallback(async (code: string) => {
        if (!sessionId || !wsClient.isConnected()) return;

        try {
            setState((prev) => ({ ...prev, isSyncing: true }));
            versionRef.current += 1;

            // Send via WebSocket for real-time sync
            wsClient.send(WSMessageType.CODE_SAVE, {
                sessionId,
                code,
                language: state.language,
                version: versionRef.current,
            });

            // Also persist via HTTP for reliability
            const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
            await fetch(`${API_URL}/interview/code/save`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    sessionId,
                    code,
                    language: state.language,
                }),
            });

            setState((prev) => ({
                ...prev,
                isSyncing: false,
                lastSyncedAt: Date.now(),
                version: versionRef.current,
            }));
        } catch (err) {
            console.error('Code sync failed:', err);
            setState((prev) => ({ ...prev, isSyncing: false }));
        }
    }, [sessionId, state.language]);

    /**
     * Restore code from server
     */
    const restoreCode = useCallback(async () => {
        if (!sessionId) return;

        try {
            const response = await fetch(`/api/interview/code?sessionId=${sessionId}`);
            const data = await response.json();

            if (data.success && data.data) {
                setState((prev) => ({
                    ...prev,
                    code: data.data.code,
                    language: data.data.language,
                }));
            }
        } catch (err) {
            console.error('Failed to restore code:', err);
        }
    }, [sessionId]);

    /**
     * Trigger sync when debounced code changes
     */
    useEffect(() => {
        if (debouncedCode && debouncedCode !== initialCode) {
            syncCode(debouncedCode);
        }
    }, [debouncedCode, syncCode, initialCode]);

    /**
     * Listen for sync acknowledgment
     */
    useEffect(() => {
        const unsubscribe = wsClient.on<{ version: number }>('sync:ack', (data) => {
            console.log('✅ Code synced, version:', data.version);
        });

        return unsubscribe;
    }, []);

    /**
     * Restore code on reconnect
     */
    useEffect(() => {
        const unsubscribe = wsClient.on<{ connected: boolean }>('connection:reconnected', () => {
            restoreCode();
        });

        return unsubscribe;
    }, [restoreCode]);

    return {
        code: state.code,
        language: state.language,
        isSyncing: state.isSyncing,
        lastSyncedAt: state.lastSyncedAt,
        setCode,
        setLanguage,
        restoreCode,
    };
}
