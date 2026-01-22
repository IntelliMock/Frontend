'use client';

import { Volume2, VolumeX, Mic, MicOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

interface VoicePanelProps {
    isSpeaking: boolean;
    transcript: string;
    volume: number;
    onVolumeChange: (volume: number) => void;
    onToggleMute: () => void;
    onStop: () => void;
    className?: string;
}

/**
 * VoicePanel Component
 * AI voice interviewer interface
 */
export function VoicePanel({
    isSpeaking,
    transcript,
    volume,
    onVolumeChange,
    onToggleMute,
    onStop,
    className,
}: VoicePanelProps) {
    const isMuted = volume === 0;

    return (
        <Card className={cn('flex h-full flex-col overflow-hidden', className)}>
            <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-lg">
                        <Mic className="h-5 w-5" />
                        AI Interviewer
                    </CardTitle>
                    <div className="flex items-center gap-2">
                        <Button
                            size="icon"
                            variant="ghost"
                            onClick={onToggleMute}
                            className="h-8 w-8"
                        >
                            {isMuted ? (
                                <VolumeX className="h-4 w-4" />
                            ) : (
                                <Volume2 className="h-4 w-4" />
                            )}
                        </Button>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* Speaking Indicator */}
                {isSpeaking && (
                    <div className="flex items-center gap-3 rounded-lg bg-blue-500/10 p-3 border border-blue-500/30">
                        <div className="flex gap-1">
                            <div className="h-4 w-1 animate-pulse rounded-full bg-blue-500" style={{ animationDelay: '0ms' }} />
                            <div className="h-4 w-1 animate-pulse rounded-full bg-blue-500" style={{ animationDelay: '150ms' }} />
                            <div className="h-4 w-1 animate-pulse rounded-full bg-blue-500" style={{ animationDelay: '300ms' }} />
                        </div>
                        <span className="text-sm font-medium text-blue-700 dark:text-blue-400">
                            AI is speaking...
                        </span>
                    </div>
                )}

                {/* Transcript */}
                <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-muted-foreground">
                        Transcript
                    </h4>
                    {transcript ? (
                        <div className="rounded-lg border bg-muted/50 p-3 text-sm">
                            {transcript}
                        </div>
                    ) : (
                        <div className="flex h-32 items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground">
                            No transcript yet
                        </div>
                    )}
                </div>

                {/* Volume Control */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <h4 className="text-sm font-semibold text-muted-foreground">
                            Volume
                        </h4>
                        <span className="text-xs text-muted-foreground">
                            {Math.round(volume * 100)}%
                        </span>
                    </div>
                    <Slider
                        value={[volume]}
                        onValueChange={(values: number[]) => onVolumeChange(values[0])}
                        max={1}
                        step={0.1}
                        className="w-full"
                    />
                </div>
            </CardContent>
        </Card>
    );
}
