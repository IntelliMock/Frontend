'use client';

import { useState, useCallback, useEffect } from 'react';
import { Hint, HintLevel, WSMessageType } from '@/types/interview';
import { wsClient } from '@/lib/interview/websocket-client';

/**
 * useHintStream Hook
 * 
 * Responsibilities:
 * - Listen to WebSocket hint stream
 * - Manage hint severity levels
 * - Request hints manually
 * - Minimal intervention philosophy
 */
export function useHintStream(sessionId: string) {
    const [hints, setHints] = useState<Hint[]>([]);
    const [isRequestingHint, setIsRequestingHint] = useState(false);

    /**
     * Request hint manually
     */
    const requestHint = useCallback(async () => {
        if (!wsClient.isConnected() || isRequestingHint) return;

        try {
            setIsRequestingHint(true);

            wsClient.send(WSMessageType.REQUEST_HINT, { sessionId });

            // Also send via HTTP
            const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
            await fetch(`${API_URL}/interview/hint/request`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sessionId }),
            });
        } catch (err) {
            console.error('Failed to request hint:', err);
        } finally {
            setTimeout(() => setIsRequestingHint(false), 1000);
        }
    }, [sessionId, isRequestingHint]);

    /**
     * Clear all hints
     */
    const clearHints = useCallback(() => {
        setHints([]);
    }, []);

    /**
     * Dismiss specific hint
     */
    const dismissHint = useCallback((hintId: string) => {
        setHints((prev) => prev.filter((h) => h.id !== hintId));
    }, []);

    /**
     * Listen for new hints from server
     */
    useEffect(() => {
        const unsubscribe = wsClient.on<Hint>('hint:new', (hint) => {
            setHints((prev) => [...prev, hint]);
            setIsRequestingHint(false);
        });

        return unsubscribe;
    }, []);

    return {
        hints,
        isRequestingHint,
        requestHint,
        clearHints,
        dismissHint,
    };
}
