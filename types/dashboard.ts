export interface QuickStats {
    totalInterviews: number;
    avgScore: number;
    bestTopic: string;
    currentStreak: number;
}

export interface PerformanceData {
    date: string;
    score: number;
    problem: string;
    topic: string;
}

export interface InterviewSession {
    id: string;
    date: string;
    problem: string;
    topic: string;
    score: number;
    status: 'Completed' | 'In Progress' | 'Abandoned';
    feedback?: string;
}

export interface ActivityDay {
    date: string;
    count: number;
}

export interface AIInsight {
    weakTopics: Array<{
        name: string;
        errorRate: number;
    }>;
    commonMistakes: string[];
    recommendation: string;
}

export interface DashboardData {
    stats: QuickStats;
    performance: PerformanceData[];
    hasActiveSession: boolean;
    history: InterviewSession[];
    activity: ActivityDay[];
    aiInsights: AIInsight;
}
