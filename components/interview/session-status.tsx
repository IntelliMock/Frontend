'use client';

import { CheckCircle2, XCircle, Loader2, WifiOff } from 'lucide-react';
import { SessionStatus } from '@/types/interview';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface SessionStatusProps {
    status: SessionStatus;
    isConnected: boolean;
    isSyncing?: boolean;
    className?: string;
}

/**
 * SessionStatus Component
 * Visual indicator for session and connection status
 */
export function SessionStatusIndicator({
    status,
    isConnected,
    isSyncing = false,
    className,
}: SessionStatusProps) {
    return (
        <div className={cn('flex items-center gap-2', className)}>
            {/* Session Status Badge */}
            <Badge
                variant={
                    status === SessionStatus.ACTIVE
                        ? 'default'
                        : status === SessionStatus.ENDED
                            ? 'destructive'
                            : 'secondary'
                }
                className="gap-1.5"
            >
                {status === SessionStatus.ACTIVE && (
                    <>
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Active
                    </>
                )}
                {status === SessionStatus.PAUSED && (
                    <>
                        <XCircle className="h-3.5 w-3.5" />
                        Paused
                    </>
                )}
                {status === SessionStatus.ENDED && (
                    <>
                        <XCircle className="h-3.5 w-3.5" />
                        Ended
                    </>
                )}
            </Badge>

            {/* Connection Status */}
            {!isConnected && (
                <Badge variant="destructive" className="gap-1.5 animate-pulse">
                    <WifiOff className="h-3.5 w-3.5" />
                    Reconnecting...
                </Badge>
            )}

            {/* Sync Status */}
            {isSyncing && isConnected && (
                <Badge variant="outline" className="gap-1.5">
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    Saving...
                </Badge>
            )}
        </div>
    );
}
