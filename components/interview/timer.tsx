'use client';

import { useEffect, useState } from 'react';
import { Clock, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TimerProps {
    timeRemaining: number; // milliseconds
    className?: string;
}

/**
 * Timer Component
 * Server-authoritative countdown timer with theme-aware styling
 */
export function Timer({ timeRemaining, className }: TimerProps) {
    const [displayTime, setDisplayTime] = useState('');
    const [isWarning, setIsWarning] = useState(false);
    const [isCritical, setIsCritical] = useState(false);

    useEffect(() => {
        const totalSeconds = Math.floor(timeRemaining / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        // Format time
        if (hours > 0) {
            setDisplayTime(
                `${hours}:${minutes.toString().padStart(2, '0')}:${seconds
                    .toString()
                    .padStart(2, '0')}`
            );
        } else {
            setDisplayTime(
                `${minutes.toString().padStart(2, '0')}:${seconds
                    .toString()
                    .padStart(2, '0')}`
            );
        }

        // Warning states
        const minutesRemaining = totalSeconds / 60;
        setIsWarning(minutesRemaining <= 10 && minutesRemaining > 5);
        setIsCritical(minutesRemaining <= 5);
    }, [timeRemaining]);

    return (
        <div
            className={cn(
                'flex items-center gap-2 rounded-lg px-4 py-2 font-mono text-lg font-semibold transition-all',
                isCritical &&
                'animate-pulse bg-destructive/20 text-destructive dark:bg-destructive/30',
                isWarning &&
                !isCritical &&
                'bg-amber-500/20 text-amber-600 dark:bg-amber-500/30 dark:text-amber-400',
                !isWarning &&
                !isCritical &&
                'bg-muted text-foreground',
                className
            )}
        >
            {isCritical ? (
                <AlertCircle className="h-5 w-5 animate-pulse" />
            ) : (
                <Clock className="h-5 w-5" />
            )}
            <span className="tabular-nums">{displayTime}</span>
        </div>
    );
}
