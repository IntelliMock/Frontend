'use client';

import { Play, Trash2, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { ExecutionResult, ExecutionStatus, ProgrammingLanguage } from '@/types/interview';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ExecutionConsoleProps {
    result: ExecutionResult;
    isExecuting: boolean;
    onExecute: () => void;
    onClear: () => void;
    className?: string;
}

/**
 * ExecutionConsole Component
 * Code execution output with streaming display
 */
export function ExecutionConsole({
    result,
    isExecuting,
    onExecute,
    onClear,
    className,
}: ExecutionConsoleProps) {
    return (
        <Card className={cn('flex h-full flex-col overflow-hidden', className)}>
            <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Console</CardTitle>
                    <div className="flex items-center gap-2">
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={onClear}
                            disabled={isExecuting}
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                        <Button
                            size="sm"
                            onClick={onExecute}
                            disabled={isExecuting}
                            className="gap-2"
                        >
                            <Play className="h-4 w-4" />
                            {isExecuting ? 'Running...' : 'Run Code'}
                        </Button>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="flex-1 overflow-hidden p-0">
                <div className="flex h-full flex-col">
                    {/* Status Bar */}
                    {result.status !== ExecutionStatus.IDLE && (
                        <div className="border-b bg-muted/50 px-4 py-2">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    {result.status === ExecutionStatus.RUNNING && (
                                        <Badge variant="outline" className="gap-1.5">
                                            <div className="h-2 w-2 animate-pulse rounded-full bg-blue-500" />
                                            Running
                                        </Badge>
                                    )}
                                    {result.status === ExecutionStatus.SUCCESS && (
                                        <Badge variant="outline" className="gap-1.5 border-green-500/50 text-green-700 dark:text-green-400">
                                            <CheckCircle2 className="h-3.5 w-3.5" />
                                            Success
                                        </Badge>
                                    )}
                                    {result.status === ExecutionStatus.ERROR && (
                                        <Badge variant="destructive" className="gap-1.5">
                                            <XCircle className="h-3.5 w-3.5" />
                                            Error
                                        </Badge>
                                    )}
                                    {result.status === ExecutionStatus.TIMEOUT && (
                                        <Badge variant="destructive" className="gap-1.5">
                                            <Clock className="h-3.5 w-3.5" />
                                            Timeout
                                        </Badge>
                                    )}
                                </div>

                                {/* Metrics */}
                                {result.metrics && (
                                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                        <span>Runtime: {result.metrics.runtime}ms</span>
                                        <span>Memory: {result.metrics.memory}MB</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Output */}
                    <div className="flex-1 overflow-y-auto bg-black/95 p-4 font-mono text-sm dark:bg-black">
                        {result.status === ExecutionStatus.IDLE ? (
                            <div className="flex h-full items-center justify-center text-muted-foreground">
                                Click "Run Code" to execute
                            </div>
                        ) : (
                            <>
                                {result.output && (
                                    <pre className="whitespace-pre-wrap text-green-400">
                                        {result.output}
                                    </pre>
                                )}
                                {result.error && (
                                    <pre className="whitespace-pre-wrap text-red-400">
                                        {result.error}
                                    </pre>
                                )}
                                {result.status === ExecutionStatus.RUNNING && !result.output && (
                                    <div className="text-blue-400">Executing...</div>
                                )}
                            </>
                        )}
                    </div>

                    {/* Test Cases */}
                    {result.testCases && result.testCases.length > 0 && (
                        <div className="border-t bg-muted/30 p-4">
                            <h4 className="mb-3 text-sm font-semibold">Test Cases</h4>
                            <div className="space-y-2">
                                {result.testCases.map((testCase, idx) => (
                                    <div
                                        key={idx}
                                        className={cn(
                                            'rounded-lg border p-3 text-xs',
                                            testCase.passed
                                                ? 'border-green-500/30 bg-green-500/10'
                                                : 'border-red-500/30 bg-red-500/10'
                                        )}
                                    >
                                        <div className="mb-1 flex items-center gap-2">
                                            {testCase.passed ? (
                                                <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                                            ) : (
                                                <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                                            )}
                                            <span className="font-semibold">Test Case {idx + 1}</span>
                                        </div>
                                        {!testCase.passed && (
                                            <div className="mt-2 space-y-1 font-mono">
                                                <div>
                                                    <span className="text-muted-foreground">Expected:</span>{' '}
                                                    {testCase.expectedOutput}
                                                </div>
                                                <div>
                                                    <span className="text-muted-foreground">Got:</span>{' '}
                                                    {testCase.actualOutput}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
