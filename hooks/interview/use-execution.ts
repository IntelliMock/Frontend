'use client';

import { useState, useCallback, useEffect } from 'react';
import {
    ExecutionResult,
    ExecutionStatus,
    ProgrammingLanguage,
    WSMessageType,
} from '@/types/interview';
import { wsClient } from '@/lib/interview/websocket-client';

/**
 * useExecution Hook
 * 
 * Responsibilities:
 * - Submit code for execution
 * - Stream execution output via WebSocket
 * - Display runtime/memory metrics
 * - Rate limiting
 * - Disable execution during sync
 */
export function useExecution(sessionId: string) {
    const [result, setResult] = useState<ExecutionResult>({
        status: ExecutionStatus.IDLE,
        output: '',
    });
    const [isExecuting, setIsExecuting] = useState(false);
    const [lastExecutionTime, setLastExecutionTime] = useState<number>(0);

    const RATE_LIMIT_MS = 2000; // 2 seconds between executions

    /**
     * Execute code
     */
    const execute = useCallback(
        async (code: string, language: ProgrammingLanguage) => {
            // Rate limiting
            const now = Date.now();
            if (now - lastExecutionTime < RATE_LIMIT_MS) {
                console.warn('Rate limited: Please wait before executing again');
                return;
            }

            if (!wsClient.isConnected()) {
                setResult({
                    status: ExecutionStatus.ERROR,
                    output: '',
                    error: 'Not connected to server. Please wait for reconnection.',
                });
                return;
            }

            try {
                setIsExecuting(true);
                setResult({
                    status: ExecutionStatus.RUNNING,
                    output: '',
                });
                setLastExecutionTime(now);

                // Send execution request via WebSocket
                wsClient.send(WSMessageType.EXECUTE, {
                    sessionId,
                    code,
                    language,
                });

                // Also send via HTTP as fallback
                const response = await fetch('/api/execute', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ sessionId, code, language }),
                });

                if (!response.ok) {
                    throw new Error('Execution failed');
                }
            } catch (err) {
                setResult({
                    status: ExecutionStatus.ERROR,
                    output: '',
                    error: err instanceof Error ? err.message : 'Execution failed',
                });
                setIsExecuting(false);
            }
        },
        [sessionId, lastExecutionTime]
    );

    /**
     * Clear console output
     */
    const clearOutput = useCallback(() => {
        setResult({
            status: ExecutionStatus.IDLE,
            output: '',
        });
    }, []);

    /**
     * Listen for execution output stream
     */
    useEffect(() => {
        const unsubscribeOutput = wsClient.on<{ output: string }>(
            'execution:output',
            (data) => {
                setResult((prev) => ({
                    ...prev,
                    output: prev.output + data.output,
                }));
            }
        );

        const unsubscribeComplete = wsClient.on<ExecutionResult>(
            'execution:complete',
            (data) => {
                setResult(data);
                setIsExecuting(false);
            }
        );

        return () => {
            unsubscribeOutput();
            unsubscribeComplete();
        };
    }, []);

    return {
        result,
        isExecuting,
        execute,
        clearOutput,
    };
}
