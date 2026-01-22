'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';
import { ProgrammingLanguage } from '@/types/interview';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

// Lazy load Monaco Editor
const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {
    ssr: false,
    loading: () => (
        <div className="flex h-full items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
    ),
});

interface CodeEditorPanelProps {
    code: string;
    language: ProgrammingLanguage;
    onChange: (code: string) => void;
    onLanguageChange: (language: ProgrammingLanguage) => void;
    isSyncing?: boolean;
    readOnly?: boolean;
    className?: string;
}

const LANGUAGE_MAP = {
    [ProgrammingLanguage.CPP]: 'cpp',
    [ProgrammingLanguage.JAVASCRIPT]: 'javascript',
    [ProgrammingLanguage.PYTHON]: 'python',
};

const LANGUAGE_DISPLAY = {
    [ProgrammingLanguage.CPP]: 'C++',
    [ProgrammingLanguage.JAVASCRIPT]: 'JavaScript',
    [ProgrammingLanguage.PYTHON]: 'Python',
};

/**
 * CodeEditorPanel Component
 * Monaco editor with theme synchronization and language selection
 */
export function CodeEditorPanel({
    code,
    language,
    onChange,
    onLanguageChange,
    isSyncing = false,
    readOnly = false,
    className,
}: CodeEditorPanelProps) {
    const { theme, systemTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Determine effective theme
    const effectiveTheme = theme === 'system' ? systemTheme : theme;
    const monacoTheme = effectiveTheme === 'dark' ? 'vs-dark' : 'vs-light';

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <Card className={cn('flex h-full flex-col', className)}>
                <CardContent className="flex h-full items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className={cn('flex h-full flex-col overflow-hidden', className)}>
            <CardHeader className="flex-row items-center justify-between space-y-0 border-b py-3">
                <Select
                    value={language}
                    onValueChange={(value) => onLanguageChange(value as ProgrammingLanguage)}
                    disabled={readOnly}
                >
                    <SelectTrigger className="w-[140px]">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={ProgrammingLanguage.CPP}>
                            {LANGUAGE_DISPLAY[ProgrammingLanguage.CPP]}
                        </SelectItem>
                        <SelectItem value={ProgrammingLanguage.JAVASCRIPT}>
                            {LANGUAGE_DISPLAY[ProgrammingLanguage.JAVASCRIPT]}
                        </SelectItem>
                        <SelectItem value={ProgrammingLanguage.PYTHON}>
                            {LANGUAGE_DISPLAY[ProgrammingLanguage.PYTHON]}
                        </SelectItem>
                    </SelectContent>
                </Select>

                {isSyncing && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        Saving...
                    </div>
                )}
            </CardHeader>

            <CardContent className="flex-1 overflow-hidden p-0">
                <MonacoEditor
                    height="100%"
                    language={LANGUAGE_MAP[language]}
                    value={code}
                    onChange={(value) => onChange(value || '')}
                    theme={monacoTheme}
                    options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        lineNumbers: 'on',
                        roundedSelection: true,
                        scrollBeyondLastLine: false,
                        readOnly,
                        automaticLayout: true,
                        tabSize: 2,
                        wordWrap: 'on',
                        formatOnPaste: true,
                        formatOnType: true,
                        suggestOnTriggerCharacters: true,
                        quickSuggestions: true,
                        folding: true,
                        foldingStrategy: 'indentation',
                        showFoldingControls: 'always',
                        matchBrackets: 'always',
                        autoClosingBrackets: 'always',
                        autoClosingQuotes: 'always',
                        padding: { top: 16, bottom: 16 },
                    }}
                />
            </CardContent>
        </Card>
    );
}
