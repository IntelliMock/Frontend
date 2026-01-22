// ============================================
// INTERVIEW ROOM TYPE DEFINITIONS
// ============================================

/**
 * Interview Session State
 * Server-authoritative session metadata
 */
export interface InterviewSession {
    sessionId: string;
    problemId: string;
    userId: string;
    startedAt: number; // Unix timestamp
    endsAt: number; // Unix timestamp
    status: SessionStatus;
    difficulty: Difficulty;
    interviewType: InterviewType;
    mode: InterviewMode;
}

export enum SessionStatus {
    ACTIVE = 'active',
    PAUSED = 'paused',
    ENDED = 'ended',
}

export enum Difficulty {
    EASY = 'EASY',
    MEDIUM = 'MEDIUM',
    HARD = 'HARD',
}

export enum InterviewType {
    DSA = 'DSA',
    SYSTEM_DESIGN = 'SYSTEM_DESIGN',
    BEHAVIORAL = 'BEHAVIORAL',
}

export enum InterviewMode {
    TIMED = 'TIMED',
    UNTIMED = 'UNTIMED',
    ADAPTIVE = 'ADAPTIVE',
}

/**
 * Code Sync State
 * Real-time code synchronization
 */
export interface CodeSyncState {
    code: string;
    language: ProgrammingLanguage;
    isSyncing: boolean;
    lastSyncedAt?: number;
    version: number; // Optimistic versioning
}

export enum ProgrammingLanguage {
    CPP = 'cpp',
    JAVASCRIPT = 'javascript',
    PYTHON = 'python',
}

/**
 * Hint Stream Types
 * AI-driven contextual hints
 */
export interface Hint {
    id: string;
    level: HintLevel;
    message: string;
    timestamp: number;
}

export enum HintLevel {
    SOFT = 'soft',
    MEDIUM = 'medium',
    DIRECT = 'direct',
}

/**
 * Execution Result Types
 * Code execution feedback
 */
export interface ExecutionResult {
    status: ExecutionStatus;
    output: string;
    error?: string;
    metrics?: ExecutionMetrics;
    testCases?: TestCaseResult[];
}

export enum ExecutionStatus {
    IDLE = 'idle',
    RUNNING = 'running',
    SUCCESS = 'success',
    ERROR = 'error',
    TIMEOUT = 'timeout',
}

export interface ExecutionMetrics {
    runtime: number; // milliseconds
    memory: number; // MB
}

export interface TestCaseResult {
    input: string;
    expectedOutput: string;
    actualOutput: string;
    passed: boolean;
}

/**
 * Voice Interviewer Types
 * AI voice interaction
 */
export interface VoiceState {
    isSpeaking: boolean;
    transcript: string;
    lastPromptType: VoicePromptType;
    isListening: boolean;
    volume: number; // 0-1
}

export enum VoicePromptType {
    INTRO = 'intro',
    HINT = 'hint',
    WARNING = 'warning',
    ENCOURAGEMENT = 'encouragement',
}

/**
 * Problem Statement
 * Question metadata and content
 */
export interface Problem {
    id: string;
    title: string;
    description: string;
    difficulty: Difficulty;
    constraints?: string;
    examples: ProblemExample[];
    starterCode: Record<ProgrammingLanguage, string>;
    testCases: TestCase[];
}

export interface ProblemExample {
    input: string;
    output: string;
    explanation?: string;
}

export interface TestCase {
    input: string;
    expectedOutput: string;
    isHidden: boolean; // Hidden test cases for validation
}

/**
 * WebSocket Message Contracts
 */
export interface WSMessage {
    type: WSMessageType;
    payload: unknown;
}

export enum WSMessageType {
    // Client → Server
    CODE_SAVE = 'code:save',
    EXECUTE = 'execute',
    REQUEST_HINT = 'hint:request',
    HEARTBEAT = 'heartbeat',

    // Server → Client
    HINT_NEW = 'hint:new',
    EXECUTION_OUTPUT = 'execution:output',
    EXECUTION_COMPLETE = 'execution:complete',
    SESSION_EXPIRED = 'session:expired',
    SYNC_ACK = 'sync:ack',
}

export interface CodeSaveMessage {
    sessionId: string;
    code: string;
    language: ProgrammingLanguage;
    version: number;
}

export interface ExecuteMessage {
    sessionId: string;
    code: string;
    language: ProgrammingLanguage;
}

export interface HintMessage {
    sessionId: string;
    hintId: string;
    level: HintLevel;
    message: string;
}

/**
 * API Response Types
 */
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
}

export interface CreateSessionResponse {
    session: InterviewSession;
    problem: Problem;
}

export interface ResumeSessionResponse {
    session: InterviewSession;
    problem: Problem;
    savedCode?: string;
}
