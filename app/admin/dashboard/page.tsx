// ============================================
// ADMIN DASHBOARD PAGE - Production Implementation
// ============================================

'use client';

import { useEffect, useState } from 'react';
import { adminApi } from '@/lib/admin-api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FolderTree, FileQuestion, CheckCircle2, Activity } from 'lucide-react';

export default function AdminDashboardPage() {
    const [stats, setStats] = useState({
        totalTopics: 0,
        totalQuestions: 0,
        publishedQuestions: 0,
        activeTopics: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        try {
            // Try to load topics
            try {
                const topicsRes = await adminApi.getTopics({ pageSize: 1 });
                if (topicsRes && topicsRes.meta) {
                    setStats(prev => ({
                        ...prev,
                        totalTopics: topicsRes.meta.totalItems || 0,
                    }));
                }
            } catch (err) {
                console.warn('Failed to load topics stats');
            }

            // Try to load questions
            try {
                const questionsRes = await adminApi.getQuestions({ pageSize: 1 });
                if (questionsRes && questionsRes.meta) {
                    setStats(prev => ({
                        ...prev,
                        totalQuestions: questionsRes.meta.totalItems || 0,
                    }));
                }
            } catch (err) {
                console.warn('Failed to load questions stats');
            }
        } finally {
            setLoading(false);
        }
    };

    const statCards = [
        {
            title: 'Total Topics',
            value: stats.totalTopics,
            icon: FolderTree,
            color: 'text-blue-500',
        },
        {
            title: 'Total Questions',
            value: stats.totalQuestions,
            icon: FileQuestion,
            color: 'text-purple-500',
        },
        {
            title: 'Published Questions',
            value: stats.publishedQuestions,
            icon: CheckCircle2,
            color: 'text-green-500',
        },
        {
            title: 'Active Topics',
            value: stats.activeTopics,
            icon: Activity,
            color: 'text-orange-500',
        },
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <p className="text-muted-foreground mt-1">
                    Overview of your admin panel
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {statCards.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <Card key={stat.title}>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">
                                    {stat.title}
                                </CardTitle>
                                <Icon className={`w-5 h-5 ${stat.color}`} />
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold">{stat.value}</div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        No recent activity to display.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
