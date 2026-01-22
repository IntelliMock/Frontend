'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import api from '@/lib/api';

export default function TestInterviewPage() {
    const [result, setResult] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const testCreateSession = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.post('/interview/start', {
                problemId: 'test-problem-id',
                difficulty: 'EASY',
                mode: 'TIMED',
                durationMinutes: 45,
            });
            setResult(response.data);
        } catch (err: any) {
            setError(err.response?.data?.message || err.message);
        } finally {
            setLoading(false);
        }
    };

    const testExecuteCode = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.post('/interview/execute', {
                sessionId: 'test-session',
                code: 'console.log("Hello from IntelliMock!");',
                language: 'javascript',
            });
            setResult(response.data);
        } catch (err: any) {
            setError(err.response?.data?.message || err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-8">
            <Card>
                <CardHeader>
                    <CardTitle>Interview Room Integration Test</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex gap-4">
                        <Button onClick={testCreateSession} disabled={loading}>
                            Test Create Session
                        </Button>
                        <Button onClick={testExecuteCode} disabled={loading}>
                            Test Execute Code
                        </Button>
                    </div>

                    {loading && <div>Loading...</div>}

                    {error && (
                        <div className="rounded-lg border border-red-500 bg-red-50 p-4 text-red-900 dark:bg-red-950 dark:text-red-100">
                            <strong>Error:</strong> {error}
                        </div>
                    )}

                    {result && (
                        <div className="rounded-lg border bg-muted p-4">
                            <strong>Result:</strong>
                            <pre className="mt-2 overflow-auto text-sm">
                                {JSON.stringify(result, null, 2)}
                            </pre>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
