'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Smartphone } from 'lucide-react';
import { useInterviewSession } from '@/hooks/interview/use-interview-session';
import { useCodeSync } from '@/hooks/interview/use-code-sync';
import { useExecution } from '@/hooks/interview/use-execution';
import { useHintStream } from '@/hooks/interview/use-hint-stream';
import { useVoiceInterviewer } from '@/hooks/interview/use-voice-interviewer';
import { InterviewHeader } from '@/components/interview/interview-header';
import { ProblemPanel } from '@/components/interview/problem-panel';
import { CodeEditorPanel } from '@/components/interview/code-editor-panel';
import { HintPanel } from '@/components/interview/hint-panel';
import { ExecutionConsole } from '@/components/interview/execution-console';
import { VoicePanel } from '@/components/interview/voice-panel';
import { Problem } from '@/types/interview';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface InterviewRoomPageProps {
    params: Promise<{
        sessionId: string;
    }>;
}

/**
 * InterviewRoom Page
 * Main interview simulation environment
 */
export default function InterviewRoomPage({ params }: InterviewRoomPageProps) {
    const router = useRouter();
    const { sessionId } = use(params); // Unwrap params Promise for Next.js 15

    // Mobile detection
    const [isMobile, setIsMobile] = useState(false);
    const [problem, setProblem] = useState<Problem | null>(null);

    // Core hooks
    const {
        session,
        isLoading,
        error,
        timeRemaining,
        isConnected,
        endSession,
    } = useInterviewSession(sessionId);

    const {
        code,
        language,
        isSyncing,
        setCode,
        setLanguage,
    } = useCodeSync(sessionId);

    const {
        result,
        isExecuting,
        execute,
        clearOutput,
    } = useExecution(sessionId);

    const {
        hints,
        isRequestingHint,
        requestHint,
        dismissHint,
    } = useHintStream(sessionId);

    const {
        isSpeaking,
        transcript,
        volume,
        setVolume,
        toggleMute,
        stop,
    } = useVoiceInterviewer(sessionId);

    // Mobile detection
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Load problem data (mock for now)
    useEffect(() => {
        if (session) {
            // TODO: Fetch actual problem from API
            setProblem({
                id: session.problemId,
                title: 'Two Sum',
                description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
                difficulty: session.difficulty,
                constraints: '2 <= nums.length <= 10^4\n-10^9 <= nums[i] <= 10^9\n-10^9 <= target <= 10^9',
                examples: [
                    {
                        input: 'nums = [2,7,11,15], target = 9',
                        output: '[0,1]',
                        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].',
                    },
                ],
                starterCode: {
                    cpp: '// Write your solution here',
                    javascript: '// Write your solution here',
                    python: '# Write your solution here',
                },
                testCases: [],
            });
        }
    }, [session]);

    // Handle code execution
    const handleExecute = () => {
        execute(code, language);
    };

    // Mobile blocking
    if (isMobile) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background p-6">
                <Alert className="max-w-md">
                    <Smartphone className="h-5 w-5" />
                    <AlertTitle className="text-lg font-semibold">
                        Desktop Required
                    </AlertTitle>
                    <AlertDescription className="mt-2">
                        The Interview Room requires a desktop or laptop computer for the best
                        experience. Please switch to a larger screen to continue your interview.
                    </AlertDescription>
                </Alert>
            </div>
        );
    }

    // Loading state
    if (isLoading || !session || !problem) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background">
                <div className="text-center">
                    <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" />
                    <p className="text-muted-foreground">Loading interview session...</p>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background p-6">
                <Alert variant="destructive" className="max-w-md">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            </div>
        );
    }

    return (
        <div className="flex h-screen flex-col bg-background">
            {/* Header */}
            <InterviewHeader
                problemTitle={problem.title}
                timeRemaining={timeRemaining}
                sessionStatus={session.status}
                isConnected={isConnected}
                isSyncing={isSyncing}
                onExit={endSession}
            />

            {/* Main Grid Layout */}
            <main className="flex-1 overflow-hidden">
                <div className="grid h-full grid-cols-2 grid-rows-2 gap-4 p-4">
                    {/* Top Left: Problem Panel */}
                    <div className="row-span-2">
                        <ProblemPanel problem={problem} />
                    </div>

                    {/* Top Right: Code Editor */}
                    <div className="row-span-1">
                        <CodeEditorPanel
                            code={code}
                            language={language}
                            onChange={setCode}
                            onLanguageChange={setLanguage}
                            isSyncing={isSyncing}
                            readOnly={session.status !== 'active'}
                        />
                    </div>

                    {/* Bottom Right: Execution Console */}
                    <div className="row-span-1">
                        <ExecutionConsole
                            result={result}
                            isExecuting={isExecuting}
                            onExecute={handleExecute}
                            onClear={clearOutput}
                        />
                    </div>
                </div>
            </main>

            {/* Optional: Hint Panel (Drawer on tablet) */}
            {/* Optional: Voice Panel (Drawer on tablet) */}
        </div>
    );
}
