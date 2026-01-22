'use client';

import { Lightbulb, ChevronDown, ChevronUp, X } from 'lucide-react';
import { Hint, HintLevel } from '@/types/interview';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

interface HintPanelProps {
    hints: Hint[];
    onRequestHint: () => void;
    onDismissHint: (hintId: string) => void;
    isRequestingHint: boolean;
    className?: string;
}

const HINT_STYLES = {
    [HintLevel.SOFT]: {
        badge: 'bg-blue-500/20 text-blue-700 dark:text-blue-400',
        border: 'border-blue-500/30',
        icon: 'text-blue-600 dark:text-blue-400',
    },
    [HintLevel.MEDIUM]: {
        badge: 'bg-amber-500/20 text-amber-700 dark:text-amber-400',
        border: 'border-amber-500/30',
        icon: 'text-amber-600 dark:text-amber-400',
    },
    [HintLevel.DIRECT]: {
        badge: 'bg-purple-500/20 text-purple-700 dark:text-purple-400',
        border: 'border-purple-500/30',
        icon: 'text-purple-600 dark:text-purple-400',
    },
};

/**
 * HintPanel Component
 * AI hint display with severity-based styling
 */
export function HintPanel({
    hints,
    onRequestHint,
    onDismissHint,
    isRequestingHint,
    className,
}: HintPanelProps) {
    const [expandedHints, setExpandedHints] = useState<Set<string>>(new Set());

    const toggleHint = (hintId: string) => {
        setExpandedHints((prev) => {
            const next = new Set(prev);
            if (next.has(hintId)) {
                next.delete(hintId);
            } else {
                next.add(hintId);
            }
            return next;
        });
    };

    return (
        <Card className={cn('flex h-full flex-col overflow-hidden', className)}>
            <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-lg">
                        <Lightbulb className="h-5 w-5 text-amber-500" />
                        AI Hints
                    </CardTitle>
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={onRequestHint}
                        disabled={isRequestingHint}
                    >
                        {isRequestingHint ? 'Requesting...' : 'Request Hint'}
                    </Button>
                </div>
            </CardHeader>

            <CardContent className="flex-1 overflow-y-auto p-4 space-y-3">
                {hints.length === 0 ? (
                    <div className="flex h-full flex-col items-center justify-center text-center text-muted-foreground">
                        <Lightbulb className="mb-3 h-12 w-12 opacity-20" />
                        <p className="text-sm">No hints yet</p>
                        <p className="mt-1 text-xs">
                            Hints will appear automatically or you can request one
                        </p>
                    </div>
                ) : (
                    hints.map((hint) => {
                        const isExpanded = expandedHints.has(hint.id);
                        const styles = HINT_STYLES[hint.level];

                        return (
                            <div
                                key={hint.id}
                                className={cn(
                                    'rounded-lg border-2 bg-card transition-all',
                                    styles.border
                                )}
                            >
                                <div className="flex items-start justify-between gap-2 p-3">
                                    <div className="flex-1">
                                        <div className="mb-2 flex items-center gap-2">
                                            <Badge className={styles.badge}>
                                                {hint.level.toUpperCase()}
                                            </Badge>
                                            <span className="text-xs text-muted-foreground">
                                                {new Date(hint.timestamp).toLocaleTimeString()}
                                            </span>
                                        </div>

                                        <div
                                            className={cn(
                                                'text-sm text-foreground',
                                                !isExpanded && 'line-clamp-2'
                                            )}
                                        >
                                            {hint.message}
                                        </div>

                                        {hint.message.length > 100 && (
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => toggleHint(hint.id)}
                                                className="mt-2 h-auto p-0 text-xs text-muted-foreground hover:text-foreground"
                                            >
                                                {isExpanded ? (
                                                    <>
                                                        Show less <ChevronUp className="ml-1 h-3 w-3" />
                                                    </>
                                                ) : (
                                                    <>
                                                        Show more <ChevronDown className="ml-1 h-3 w-3" />
                                                    </>
                                                )}
                                            </Button>
                                        )}
                                    </div>

                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-6 w-6 shrink-0"
                                        onClick={() => onDismissHint(hint.id)}
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        );
                    })
                )}
            </CardContent>
        </Card>
    );
}
