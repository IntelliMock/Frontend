'use client';

import { useRouter } from 'next/navigation';
import { LogOut, AlertCircle } from 'lucide-react';
import { Timer } from './timer';
import { SessionStatusIndicator } from './session-status';
import { SessionStatus } from '@/types/interview';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface InterviewHeaderProps {
  problemTitle: string;
  timeRemaining: number;
  sessionStatus: SessionStatus;
  isConnected: boolean;
  isSyncing?: boolean;
  onExit: () => void;
}

export function InterviewHeader({
  problemTitle,
  timeRemaining,
  sessionStatus,
  isConnected,
  isSyncing = false,
  onExit,
}: InterviewHeaderProps) {
  return (
    <header className="border-b bg-card">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex-1">
          <h1 className="text-xl font-bold text-foreground line-clamp-1">
            {problemTitle}
          </h1>
        </div>

        <div className="flex-shrink-0 px-4">
          <Timer timeRemaining={timeRemaining} />
        </div>

        <div className="flex flex-1 items-center justify-end gap-4">
          <SessionStatusIndicator
            status={sessionStatus}
            isConnected={isConnected}
            isSyncing={isSyncing}
          />

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <LogOut className="h-4 w-4" />
                Exit
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-amber-500" />
                  Exit Interview?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to exit this interview session? Your progress
                  will be saved, but the timer will continue running.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={onExit}>
                  Exit Interview
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </header>
  );
}
