import { QuickStats } from '@/types/dashboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Target, Trophy, Flame } from 'lucide-react';

interface WelcomeSectionProps {
    user: {
        name?: string | null;
    };
    stats: QuickStats;
}

export function WelcomeSection({ user, stats }: WelcomeSectionProps) {
    const statCards = [
        {
            title: 'Total Interviews',
            value: stats.totalInterviews,
            icon: Target,
            color: 'text-blue-600 dark:text-blue-400',
        },
        {
            title: 'Average Score',
            value: stats.avgScore.toFixed(1),
            icon: TrendingUp,
            color: 'text-green-600 dark:text-green-400',
        },
        {
            title: 'Best Topic',
            value: stats.bestTopic,
            icon: Trophy,
            color: 'text-yellow-600 dark:text-yellow-400',
        },
        {
            title: 'Current Streak',
            value: `${stats.currentStreak} days`,
            icon: Flame,
            color: 'text-orange-600 dark:text-orange-400',
        },
    ];

    return (
        <div className="space-y-6">
            {/* Greeting Header */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight">
                    Welcome back, {user.name || 'User'}!
                </h1>
                <p className="text-muted-foreground mt-2">
                    Ready to practice your next interview?
                </p>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {statCards.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <Card key={stat.title} className="rounded-2xl border border-border bg-card shadow-lg">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">
                                    {stat.title}
                                </CardTitle>
                                <Icon className={`h-4 w-4 ${stat.color}`} />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold tracking-tight text-foreground">
                                    {stat.value}
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
