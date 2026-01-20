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
    const feedbacks = [
        "Good problem-solving approach! However, consider optimizing the time complexity from O(n²) to O(n) using a hash map. Your explanation was clear but could benefit from discussing space-time tradeoffs.",
        "Excellent work on the iterative solution! You correctly identified the edge cases. For improvement, try to explain your thought process more verbally as you code.",
        "Well done! Your solution is optimal. Minor suggestion: add more comments in your code to explain the logic, especially for the stack operations.",
        "Good attempt, but the solution has a bug with negative numbers. Review the problem constraints more carefully. Your communication skills are strong!",
        "Great recursive solution! Consider the iterative approach as well for better space complexity. Your time complexity analysis was spot-on.",
        "The solution works but is not optimal. You missed the dynamic programming optimization. Spend more time on the problem analysis phase before coding.",
        "Excellent! You identified the optimal solution quickly. Your code is clean and well-structured. Keep up the good work!",
        "Good progress, but you struggled with explaining the approach. Practice verbalizing your thought process. The final solution was correct.",
        "Outstanding performance! Your solution is both time and space optimal. Your explanation was clear and concise. This is interview-ready code.",
        "Decent attempt, but you missed several edge cases (empty input, single element). Always start by discussing constraints and edge cases with the interviewer.",
    ];

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
        feedback: i === 0 ? undefined : feedbacks[i], // No feedback for in-progress session
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
