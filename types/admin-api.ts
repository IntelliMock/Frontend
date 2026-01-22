// ============================================
// ADMIN API TYPES - Signature Only
// ============================================

// Common Types
export type UUID = string;
export type ISODateString = string;

// Admin User
export interface AdminUser {
    id: UUID;
    email: string;
    name: string;
    role: 'SUPERADMIN' | 'CONTENT_MANAGER' | 'MODERATOR' | 'ANALYST';
    isActive: boolean;
    lastLoginAt: ISODateString | null;
    createdAt: ISODateString;
    updatedAt: ISODateString;
}

// Topic
export interface Topic {
    id: UUID;
    name: string;
    description: string;
    difficulty: 'EASY' | 'MEDIUM' | 'HARD';
    isActive: boolean;
    createdBy: UUID;
    createdAt: ISODateString;
    updatedAt: ISODateString;
    questionCount?: number;
}

// Question
export interface Question {
    id: UUID;
    topicId: UUID;
    topicName?: string;
    title: string;
    problemStatement: string;
    inputFormat: string;
    outputFormat: string;
    constraints: string;
    sampleInput: string;
    sampleOutput: string;
    explanation: string | null;
    tags: string[];
    difficulty: 'EASY' | 'MEDIUM' | 'HARD';
    status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
    version: number;
    publishedAt: ISODateString | null;
    archivedAt: ISODateString | null;
    createdBy: UUID;
    createdAt: ISODateString;
    updatedAt: ISODateString;
    hintCount?: number;
    testCaseCount?: number;
}

// Hint
export interface Hint {
    id: UUID;
    questionId: UUID;
    level: number;
    content: string;
    createdAt: ISODateString;
    updatedAt: ISODateString;
}

// Test Case
export interface TestCase {
    id: UUID;
    questionId: UUID;
    input: string;
    expectedOutput: string;
    isHidden: boolean;
    weight: number;
    explanation: string | null;
    createdAt: ISODateString;
    updatedAt: ISODateString;
}

// API Response Wrapper
export interface ApiResponse<T> {
    data: T;
    meta?: {
        timestamp: ISODateString;
        pagination?: PaginationMeta;
    };
}

export interface PaginationMeta {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
}

// Error Response
export interface ApiError {
    code: string;
    message: string;
    details?: any;
}
