'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function StartInterviewPage() {
    const router = useRouter();
    const [problemId, setProblemId] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const startInterview = async () => {
        if (!problemId.trim()) {
            setError('Please enter a problem ID');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
            const response = await fetch(`${API_URL}/interview/start`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    problemId: problemId.trim(),
                    difficulty: 'EASY',
                    mode: 'TIMED',
                    durationMinutes: 2, // 2 minutes for testing
                }),
            });

            const data = await response.json();

            if (data.success && data.data) {
                // Navigate to interview room
                router.push(`/interview/${data.data.session.sessionId}`);
            } else {
                setError(data.error || 'Failed to create session');
            }
        } catch (err: any) {
            setError(err.message || 'Failed to connect to backend');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-background p-6">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Start Interview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <label className="text-sm font-medium">Problem ID</label>
                        <Input
                            value={problemId}
                            onChange={(e) => setProblemId(e.target.value)}
                            placeholder="Enter any problem ID (e.g., test-problem)"
                            className="mt-1"
                        />
                        <p className="mt-1 text-xs text-muted-foreground">
                            For testing, you can enter any ID. The backend will create a sample problem.
                        </p>
                    </div>

                    {error && (
                        <div className="rounded-lg border border-red-500 bg-red-50 p-3 text-sm text-red-900 dark:bg-red-950 dark:text-red-100">
                            {error}
                        </div>
                    )}

                    <Button
                        onClick={startInterview}
                        disabled={loading}
                        className="w-full"
                    >
                        {loading ? 'Starting...' : 'Start Interview'}
                    </Button>

                    <div className="rounded-lg border bg-muted p-3 text-xs">
                        <strong>Backend Status:</strong>
                        <div className="mt-1">API URL: {process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'}</div>
                        <div>WebSocket URL: {process.env.NEXT_PUBLIC_WS_URL || 'http://localhost:3001'}</div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
