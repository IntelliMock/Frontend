import { QuickStats } from '@/types/dashboard';
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
            gradient: 'from-blue-500/10 to-cyan-500/10',
            iconBg: 'bg-blue-500/10',
            iconColor: 'text-blue-600 dark:text-blue-400',
            border: 'border-blue-500/20',
        },
        {
            title: 'Average Score',
            value: stats.avgScore.toFixed(1),
            suffix: '/20',
            icon: TrendingUp,
            gradient: 'from-green-500/10 to-emerald-500/10',
            iconBg: 'bg-green-500/10',
            iconColor: 'text-green-600 dark:text-green-400',
            border: 'border-green-500/20',
        },
        {
            title: 'Best Topic',
            value: stats.bestTopic,
            icon: Trophy,
            gradient: 'from-yellow-500/10 to-amber-500/10',
            iconBg: 'bg-yellow-500/10',
            iconColor: 'text-yellow-600 dark:text-yellow-400',
            border: 'border-yellow-500/20',
        },
        {
            title: 'Current Streak',
            value: stats.currentStreak,
            suffix: ' days',
            icon: Flame,
            gradient: 'from-orange-500/10 to-red-500/10',
            iconBg: 'bg-orange-500/10',
            iconColor: 'text-orange-600 dark:text-orange-400',
            border: 'border-orange-500/20',
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

            {/* Quick Stats Grid - 2 columns on mobile, 4 on desktop */}
            <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4 lg:max-w-4xl lg:mx-auto">
                {statCards.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div
                            key={stat.title}
                            className={`group relative overflow-hidden rounded-xl border ${stat.border} bg-gradient-to-br ${stat.gradient} p-3 md:p-4 transition-all hover:shadow-lg hover:scale-[1.02] backdrop-blur-sm`}
                        >
                            {/* Background Pattern */}
                            <div className="absolute inset-0 bg-grid-white/5 [mask-image:radial-gradient(white,transparent_85%)]" />

                            {/* Content - Vertical Centered Layout */}
                            <div className="relative flex flex-col items-center text-center space-y-2">
                                {/* Icon */}
                                <div className={`rounded-lg p-2 ${stat.iconBg} ring-1 ring-white/10`}>
                                    <Icon className={`h-4 w-4 md:h-5 md:w-5 ${stat.iconColor}`} />
                                </div>

                                {/* Title */}
                                <span className="text-[10px] md:text-xs font-semibold text-muted-foreground uppercase tracking-wider leading-tight">
                                    {stat.title}
                                </span>

                                {/* Value */}
                                <div className="flex items-baseline justify-center gap-0.5 md:gap-1">
                                    <span className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                                        {stat.value}
                                    </span>
                                    {stat.suffix && (
                                        <span className="text-xs md:text-sm font-medium text-muted-foreground">
                                            {stat.suffix}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Hover Glow Effect */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-tr from-transparent via-white/5 to-transparent" />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
