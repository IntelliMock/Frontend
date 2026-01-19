import { DashboardData } from '@/types/dashboard';
import { subDays, format } from 'date-fns';

export function getDummyDashboardData(): DashboardData {
    // Generate performance data for last 20 interviews
    const performance = Array.from({ length: 20 }, (_, i) => ({
        date: format(subDays(new Date(), 20 - i), 'yyyy-MM-dd'),
        score: Math.floor(Math.random() * 8) + 10, // Random score between 10-18
        problem: [
            'Two Sum Variants',
            'Longest Substring',
            'Binary Tree Traversal',
            'Graph BFS/DFS',
            'Dynamic Programming',
            'Merge Intervals',
            'Sliding Window Maximum',
            'LRU Cache Implementation',
        ][Math.floor(Math.random() * 8)],
        topic: ['Arrays', 'Strings', 'Trees', 'Graphs', 'DP', 'Greedy', 'Sliding Window', 'Design'][
            Math.floor(Math.random() * 8)
        ],
    }));

    // Generate interview history for last 10 sessions
    const history = Array.from({ length: 10 }, (_, i) => ({
        id: `session_${i + 1}`,
        date: format(subDays(new Date(), i * 2), 'MMM dd, yyyy'),
        problem: [
            'Two Sum',
            'Reverse Linked List',
            'Valid Parentheses',
            'Maximum Subarray',
            'Climbing Stairs',
            'House Robber',
            'Coin Change',
            'Word Break',
            'Longest Palindrome',
            'Merge K Sorted Lists',
        ][i],
        topic: ['Arrays', 'Linked Lists', 'Stack', 'DP', 'DP', 'DP', 'DP', 'DP', 'Strings', 'Heap'][i],
        score: [16, 14, 18, 12, 15, 9, 17, 13, 19, 11][i],
        status: i === 0 ? 'In Progress' : 'Completed' as 'Completed' | 'In Progress' | 'Abandoned',
    }));

    // Generate activity data for last 90 days
    const activity = Array.from({ length: 90 }, (_, i) => ({
        date: format(subDays(new Date(), 90 - i), 'yyyy-MM-dd'),
        count: Math.random() > 0.6 ? Math.floor(Math.random() * 3) + 1 : 0,
    }));

    return {
        stats: {
            totalInterviews: 12,
            avgScore: 13.6,
            bestTopic: 'Arrays',
            currentStreak: 4,
        },
        performance,
        hasActiveSession: true,
        history,
        activity,
        aiInsights: {
            weakTopics: [
                { name: 'Graph Traversal', errorRate: 65 },
                { name: 'DP Optimization', errorRate: 58 },
                { name: 'Binary Search Edge Cases', errorRate: 52 },
            ],
            commonMistakes: [
                'Time complexity explanation unclear',
                'Edge cases not considered',
                'Suboptimal approach chosen',
            ],
            recommendation:
                'You lose most points while explaining time complexity. Practice verbalizing trade-offs and explaining your thought process step-by-step.',
        },
    };
}
