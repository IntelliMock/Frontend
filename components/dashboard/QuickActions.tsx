"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlayCircle, RotateCcw, Target } from 'lucide-react';

interface QuickActionsProps {
    hasActiveSession: boolean;
}

export function QuickActions({ hasActiveSession }: QuickActionsProps) {
    const actions = [
        {
            title: 'Start Mock Interview',
            description: 'Begin a new AI-powered interview session',
            icon: PlayCircle,
            isPrimary: true,
            disabled: false,
            action: () => console.log('Start interview'),
        },
        {
            title: 'Resume Last Interview',
            description: 'Continue where you left off',
            icon: RotateCcw,
            isPrimary: false,
            disabled: !hasActiveSession,
            action: () => console.log('Resume interview'),
        },
        {
            title: 'Practice Weak Topics',
            description: 'Focus on areas that need improvement',
            icon: Target,
            isPrimary: false,
            disabled: false,
            action: () => console.log('Practice weak topics'),
        },
    ];

    return (
        <div className="grid gap-4 md:grid-cols-3">
            {actions.map((action) => {
                const Icon = action.icon;
                return (
                    <Card
                        key={action.title}
                        className={`rounded-2xl border shadow-lg transition-all hover:shadow-xl ${action.isPrimary
                            ? 'border-primary bg-accent/10 dark:bg-accent/20'
                            : 'border-border bg-card'
                            } ${action.disabled ? 'opacity-50' : 'hover:scale-[1.02]'}`}
                    >
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <div
                                    className={`rounded-lg p-2 ${action.isPrimary
                                        ? 'bg-primary text-primary-foreground'
                                        : 'bg-muted text-muted-foreground'
                                        }`}
                                >
                                    <Icon className="h-5 w-5" />
                                </div>
                                <CardTitle className="text-lg">{action.title}</CardTitle>
                            </div>
                            <CardDescription className="mt-2">{action.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button
                                className="w-full"
                                variant={action.isPrimary ? 'default' : 'outline'}
                                disabled={action.disabled}
                                onClick={action.action}
                            >
                                {action.disabled ? 'No Active Session' : 'Get Started'}
                            </Button>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}
