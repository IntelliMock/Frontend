"use client";

import { useState } from 'react';
import { InterviewSession } from '@/types/dashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

interface InterviewHistoryProps {
    sessions: InterviewSession[];
}

export function InterviewHistory({ sessions }: InterviewHistoryProps) {
    const [showAll, setShowAll] = useState(false);
    const displayedSessions = showAll ? sessions : sessions.slice(0, 5);

    const getScoreColor = (score: number) => {
        if (score >= 15) return 'text-green-600 dark:text-green-400';
        if (score >= 10) return 'text-yellow-600 dark:text-yellow-400';
        return 'text-red-600 dark:text-red-400';
    };

    const getStatusBadge = (status: string) => {
        if (status === 'Completed') return 'default';
        if (status === 'In Progress') return 'secondary';
        return 'destructive';
    };

    return (
        <Card className="rounded-2xl border border-border bg-card shadow-lg">
            <CardHeader>
                <CardTitle>Interview History</CardTitle>
                <CardDescription>Your recent interview sessions</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {displayedSessions.map((session) => (
                        <div
                            key={session.id}
                            className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-4 transition-colors hover:bg-muted/50"
                        >
                            <div className="flex-1 space-y-1">
                                <div className="flex items-center gap-2">
                                    <p className="font-medium text-foreground">{session.problem}</p>
                                    <Badge variant={getStatusBadge(session.status)} className="text-xs">
                                        {session.status}
                                    </Badge>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                    <span>{session.date}</span>
                                    <span>•</span>
                                    <Badge variant="outline" className="text-xs">
                                        {session.topic}
                                    </Badge>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className={`text-2xl font-bold ${getScoreColor(session.score)}`}>
                                    {session.score}
                                </p>
                                <p className="text-xs text-muted-foreground">/20</p>
                            </div>
                        </div>
                    ))}
                </div>

                {sessions.length > 5 && (
                    <Button
                        variant="ghost"
                        className="mt-4 w-full"
                        onClick={() => setShowAll(!showAll)}
                    >
                        {showAll ? 'Show Less' : `Show More (${sessions.length - 5} more)`}
                        <ChevronDown
                            className={`ml-2 h-4 w-4 transition-transform ${showAll ? 'rotate-180' : ''}`}
                        />
                    </Button>
                )}

                {sessions.length === 0 && (
                    <div className="py-8 text-center text-muted-foreground">
                        <p>No interview history yet</p>
                        <p className="text-sm">Start your first mock interview to see your progress here</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
