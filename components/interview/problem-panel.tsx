'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Problem, Difficulty } from '@/types/interview';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ProblemPanelProps {
    problem: Problem;
    className?: string;
}

/**
 * ProblemPanel Component
 * Scrollable problem statement with collapsible sections
 */
export function ProblemPanel({ problem, className }: ProblemPanelProps) {
    const [isConstraintsExpanded, setIsConstraintsExpanded] = useState(true);
    const [isExamplesExpanded, setIsExamplesExpanded] = useState(true);

    const difficultyColor = {
        [Difficulty.EASY]: 'bg-green-500/20 text-green-700 dark:text-green-400',
        [Difficulty.MEDIUM]: 'bg-amber-500/20 text-amber-700 dark:text-amber-400',
        [Difficulty.HARD]: 'bg-red-500/20 text-red-700 dark:text-red-400',
    };

    return (
        <Card className={cn('flex h-full flex-col overflow-hidden', className)}>
            <CardHeader className="border-b">
                <div className="flex items-start justify-between gap-4">
                    <CardTitle className="text-xl">{problem.title}</CardTitle>
                    <Badge className={difficultyColor[problem.difficulty]}>
                        {problem.difficulty}
                    </Badge>
                </div>
            </CardHeader>

            <CardContent className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Description */}
                <div>
                    <h3 className="text-sm font-semibold text-muted-foreground mb-2">
                        Description
                    </h3>
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                        <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                            {problem.description}
                        </p>
                    </div>
                </div>

                {/* Examples */}
                <div>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsExamplesExpanded(!isExamplesExpanded)}
                        className="mb-2 -ml-2 gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground"
                    >
                        Examples
                        {isExamplesExpanded ? (
                            <ChevronUp className="h-4 w-4" />
                        ) : (
                            <ChevronDown className="h-4 w-4" />
                        )}
                    </Button>

                    {isExamplesExpanded && (
                        <div className="space-y-4">
                            {problem.examples.map((example, idx) => (
                                <div
                                    key={idx}
                                    className="rounded-lg border bg-muted/50 p-4 space-y-2"
                                >
                                    <div>
                                        <span className="text-xs font-semibold text-muted-foreground">
                                            Input:
                                        </span>
                                        <pre className="mt-1 font-mono text-sm text-foreground">
                                            {example.input}
                                        </pre>
                                    </div>
                                    <div>
                                        <span className="text-xs font-semibold text-muted-foreground">
                                            Output:
                                        </span>
                                        <pre className="mt-1 font-mono text-sm text-foreground">
                                            {example.output}
                                        </pre>
                                    </div>
                                    {example.explanation && (
                                        <div>
                                            <span className="text-xs font-semibold text-muted-foreground">
                                                Explanation:
                                            </span>
                                            <p className="mt-1 text-sm text-muted-foreground">
                                                {example.explanation}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Constraints */}
                {problem.constraints && (
                    <div>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsConstraintsExpanded(!isConstraintsExpanded)}
                            className="mb-2 -ml-2 gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground"
                        >
                            Constraints
                            {isConstraintsExpanded ? (
                                <ChevronUp className="h-4 w-4" />
                            ) : (
                                <ChevronDown className="h-4 w-4" />
                            )}
                        </Button>

                        {isConstraintsExpanded && (
                            <div className="rounded-lg border bg-muted/50 p-4">
                                <pre className="font-mono text-sm text-foreground whitespace-pre-wrap">
                                    {problem.constraints}
                                </pre>
                            </div>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
