"use client";

import { useState } from 'react';
import { InterviewSession } from '@/types/dashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { ChevronDown, Eye, Calendar, Tag } from 'lucide-react';

interface InterviewHistoryProps {
    sessions: InterviewSession[];
}

export function InterviewHistory({ sessions }: InterviewHistoryProps) {
    const [showAll, setShowAll] = useState(false);
    const [selectedFeedback, setSelectedFeedback] = useState<InterviewSession | null>(null);
    const displayedSessions = showAll ? sessions : sessions.slice(0, 5);

    const getScoreColor = (score: number) => {
        if (score >= 15) return 'text-green-600 dark:text-green-400';
        if (score >= 10) return 'text-yellow-600 dark:text-yellow-400';
        return 'text-red-600 dark:text-red-400';
    };

    const getScoreBgColor = (score: number) => {
        if (score >= 15) return 'bg-green-500/10 border-green-500/20';
        if (score >= 10) return 'bg-yellow-500/10 border-yellow-500/20';
        return 'bg-red-500/10 border-red-500/20';
    };

    const getStatusBadge = (status: string) => {
        if (status === 'Completed') return 'default';
        if (status === 'In Progress') return 'secondary';
        return 'destructive';
    };

    return (
        <>
            <Card className="rounded-2xl border border-border bg-card shadow-lg">
                <CardHeader>
                    <CardTitle>Interview History</CardTitle>
                    <CardDescription>Your recent interview sessions</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        {displayedSessions.map((session) => (
                            <div
                                key={session.id}
                                className="group relative overflow-hidden rounded-xl border border-border bg-gradient-to-br from-muted/20 to-transparent p-4 transition-all hover:shadow-md hover:border-primary/30 hover:bg-muted/30"
                            >
                                {/* Hover gradient effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity" />

                                {/* Desktop: Single Row Layout */}
                                <div className="relative hidden md:flex items-center gap-6">
                                    {/* Left: Problem Name & Status (30%) */}
                                    <div className="flex-[3] min-w-0">
                                        <div className="flex items-center gap-2">
                                            <h4 className="font-semibold text-foreground truncate">{session.problem}</h4>
                                            <Badge variant={getStatusBadge(session.status)} className="text-xs shrink-0">
                                                {session.status}
                                            </Badge>
                                        </div>
                                    </div>

                                    {/* Middle: Date & Topic (40%) */}
                                    <div className="flex-[4] flex justify-center gap-4">
                                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                                            <Calendar className="h-3.5 w-3.5 shrink-0" />
                                            <span className="whitespace-nowrap">{session.date}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Tag className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                                            <Badge variant="outline" className="text-xs">
                                                {session.topic}
                                            </Badge>
                                        </div>
                                    </div>

                                    {/* Right: Score & Feedback Button (30%) */}
                                    <div className="flex-[3] flex items-center justify-end gap-3">
                                        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${getScoreBgColor(session.score)}`}>
                                            <p className={`text-2xl font-bold leading-none ${getScoreColor(session.score)}`}>
                                                {session.score}
                                            </p>
                                            <p className="text-xs text-muted-foreground">/20</p>
                                        </div>
                                        {session.feedback && (
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-9 gap-1.5 hover:bg-primary/10 hover:text-primary shrink-0"
                                                onClick={() => setSelectedFeedback(session)}
                                            >
                                                <Eye className="h-4 w-4" />
                                                Feedback
                                            </Button>
                                        )}
                                    </div>
                                </div>

                                {/* Mobile: Two Row Layout */}
                                <div className="relative md:hidden space-y-3">
                                    {/* Row 1: Problem, Status, Score, Feedback */}
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex-1 min-w-0 space-y-1.5">
                                            <h3 className="font-semibold text-foreground text-sm truncate">{session.problem}</h3>
                                            <Badge variant={getStatusBadge(session.status)} className="text-xs w-fit">
                                                {session.status}
                                            </Badge>
                                        </div>
                                        <div className="flex items-center gap-2 shrink-0">
                                            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border ${getScoreBgColor(session.score)}`}>
                                                <p className={`text-xl font-bold leading-none ${getScoreColor(session.score)}`}>
                                                    {session.score}
                                                </p>
                                                <p className="text-xs text-muted-foreground">/20</p>
                                            </div>
                                            {session.feedback && (
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-8 w-8 p-0 hover:bg-primary/10 hover:text-primary"
                                                    onClick={() => setSelectedFeedback(session)}
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </div>
                                    </div>

                                    {/* Row 2: Date & Topic */}
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground shrink-0">
                                            <Calendar className="h-3 w-3" />
                                            <span className="whitespace-nowrap">{session.date}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 min-w-0">
                                            <Tag className="h-3 w-3 text-muted-foreground shrink-0" />
                                            <Badge variant="outline" className="text-xs truncate">
                                                {session.topic}
                                            </Badge>
                                        </div>
                                    </div>
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
                        <div className="py-12 text-center text-muted-foreground">
                            <p className="text-lg font-medium">No interview history yet</p>
                            <p className="text-sm mt-1">Start your first mock interview to see your progress here</p>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Feedback Modal */}
            <Dialog open={!!selectedFeedback} onOpenChange={() => setSelectedFeedback(null)}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-xl">
                            <Eye className="h-5 w-5 text-primary" />
                            AI Feedback - {selectedFeedback?.problem}
                        </DialogTitle>
                        <DialogDescription className="text-base">
                            Interview completed on {selectedFeedback?.date} • Score: {selectedFeedback?.score}/20
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 mt-2">
                        {/* Score Badge */}
                        <div className="grid grid-cols-3 gap-4 p-4 rounded-xl bg-muted/50 border border-border">
                            <div>
                                <p className="text-xs font-medium text-muted-foreground mb-1">Final Score</p>
                                <p className={`text-3xl font-bold ${getScoreColor(selectedFeedback?.score || 0)}`}>
                                    {selectedFeedback?.score}/20
                                </p>
                            </div>
                            <div>
                                <p className="text-xs font-medium text-muted-foreground mb-1">Topic</p>
                                <Badge variant="outline" className="mt-1">
                                    {selectedFeedback?.topic}
                                </Badge>
                            </div>
                            <div>
                                <p className="text-xs font-medium text-muted-foreground mb-1">Status</p>
                                <Badge variant={getStatusBadge(selectedFeedback?.status || '')} className="mt-1">
                                    {selectedFeedback?.status}
                                </Badge>
                            </div>
                        </div>

                        {/* Feedback Content */}
                        <div className="p-5 rounded-xl border border-border bg-card">
                            <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                                <span className="h-1 w-1 rounded-full bg-primary" />
                                Detailed Feedback
                            </h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {selectedFeedback?.feedback}
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 justify-end pt-2">
                            <Button variant="outline" onClick={() => setSelectedFeedback(null)}>
                                Close
                            </Button>
                            <Button className="gap-2">
                                Reattempt This Problem
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
