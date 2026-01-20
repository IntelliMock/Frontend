"use client";

import { useState, useEffect } from 'react';
import { ActivityDay } from '@/types/dashboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTheme } from 'next-themes';
import { subDays, format, startOfWeek, addDays, getMonth } from 'date-fns';
import { Info } from 'lucide-react';

interface ConsistencyHeatmapProps {
    activity: ActivityDay[];
}

export function ConsistencyHeatmap({ activity }: ConsistencyHeatmapProps) {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Get activity count for a specific date
    const getActivityCount = (date: Date) => {
        const dateStr = format(date, 'yyyy-MM-dd');
        const found = activity.find((a) => a.date === dateStr);
        return found ? found.count : 0;
    };

    // Calculate statistics
    const totalSubmissions = activity.reduce((sum, day) => sum + day.count, 0);
    const activeDays = activity.filter((day) => day.count > 0).length;

    // Calculate max streak
    const calculateMaxStreak = () => {
        let maxStreak = 0;
        let currentStreak = 0;
        const sortedActivity = [...activity].sort((a, b) => a.date.localeCompare(b.date));

        sortedActivity.forEach((day) => {
            if (day.count > 0) {
                currentStreak++;
                maxStreak = Math.max(maxStreak, currentStreak);
            } else {
                currentStreak = 0;
            }
        });

        return maxStreak;
    };

    const maxStreak = calculateMaxStreak();

    // Get color based on activity count (GitHub-style)
    const getActivityColor = (count: number) => {
        if (!mounted) {
            if (count === 0) return 'bg-muted/30';
            if (count === 1) return 'bg-green-900/40';
            if (count === 2) return 'bg-green-700/60';
            if (count >= 3) return 'bg-green-600/80';
            return 'bg-green-500';
        }

        const isDark = theme === 'dark';
        if (count === 0) return isDark ? 'bg-muted/30' : 'bg-gray-200';
        if (count === 1) return isDark ? 'bg-green-900/50' : 'bg-green-200';
        if (count === 2) return isDark ? 'bg-green-700/70' : 'bg-green-400';
        if (count >= 3) return isDark ? 'bg-green-600' : 'bg-green-500';
        return isDark ? 'bg-green-500' : 'bg-green-600';
    };

    // Generate grid data (last 52 weeks = 1 year)
    const weeks = 52;
    const today = new Date();
    const startDate = startOfWeek(subDays(today, weeks * 7));

    const gridData = Array.from({ length: weeks }, (_, weekIndex) => {
        return Array.from({ length: 7 }, (_, dayIndex) => {
            const date = addDays(startDate, weekIndex * 7 + dayIndex);
            return {
                date,
                count: getActivityCount(date),
            };
        });
    });

    // Generate month labels - one for each month that appears
    const monthLabels: { label: string; weekIndex: number }[] = [];
    let lastMonth = -1;

    gridData.forEach((week, weekIndex) => {
        const midWeekDay = week[3].date;
        const currentMonth = getMonth(midWeekDay);

        if (currentMonth !== lastMonth) {
            monthLabels.push({
                label: format(midWeekDay, 'MMM'),
                weekIndex,
            });
            lastMonth = currentMonth;
        }
    });

    return (
        <Card className="rounded-2xl border border-border bg-card shadow-lg">
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <CardTitle className="text-lg">
                            <span className="text-2xl font-bold">{totalSubmissions}</span>
                            <span className="text-sm font-normal text-muted-foreground ml-2">
                                submissions in the past one year
                            </span>
                        </CardTitle>
                        <Info className="h-4 w-4 text-muted-foreground" />
                    </div>
                </div>
                <div className="flex items-center gap-6 text-sm text-muted-foreground pt-2">
                    <span>Total active days: <strong className="text-foreground">{activeDays}</strong></span>
                    <span>Max streak: <strong className="text-foreground">{maxStreak}</strong></span>
                </div>
            </CardHeader>
            <CardContent>
                {/* Desktop: Full width grid */}
                <div className="hidden md:block">
                    <div className="space-y-1">
                        {/* Month labels row */}
                        <div className="flex gap-[2px] mb-1">
                            {/* Empty space for day labels */}
                            <div className="w-[50px] pr-1.5"></div>

                            {/* Month labels container */}
                            <div className="flex-1 relative h-4 flex justify-around">
                                {monthLabels.map((month) => {
                                    const position = ((month.weekIndex + 1) / 52) * 100;
                                    return (
                                        <div
                                            key={month.weekIndex}
                                            className="absolute text-[11px] text-muted-foreground"
                                            style={{
                                                left: `${position}%`,
                                            }}
                                        >
                                            {month.label}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Heatmap grid */}
                        <div className="flex gap-[2px]">
                            {/* Day labels */}
                            <div className="flex flex-col gap-[2px] pr-1.5 w-[50px]">
                                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => (
                                    <div
                                        key={i}
                                        className="flex h-[9px] items-center justify-start text-[10px] text-muted-foreground"
                                    >
                                        {day}
                                    </div>
                                ))}
                            </div>

                            {/* Activity cells - flex to fill available space */}
                            <div className="flex-1 flex gap-[2px]">
                                {gridData.map((week, weekIndex) => (
                                    <div key={weekIndex} className="flex-1 flex flex-col gap-[2px]">
                                        {week.map((day, dayIndex) => (
                                            <div
                                                key={dayIndex}
                                                className={`h-[9px] rounded-sm ${getActivityColor(day.count)} transition-all hover:ring-1 hover:ring-primary/50 cursor-pointer`}
                                                title={`${format(day.date, 'MMM dd, yyyy')}: ${day.count} interview${day.count !== 1 ? 's' : ''}`}
                                            />
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Legend */}
                        <div className="flex items-center justify-end gap-2 pt-3">
                            <span className="text-xs text-muted-foreground">Less</span>
                            <div className="flex gap-[2px]">
                                {[0, 1, 2, 3, 4].map((level) => (
                                    <div
                                        key={level}
                                        className={`h-[9px] w-[9px] rounded-sm ${getActivityColor(level)}`}
                                    />
                                ))}
                            </div>
                            <span className="text-xs text-muted-foreground">More</span>
                        </div>
                    </div>
                </div>

                {/* Mobile: Horizontally scrollable */}
                <div className="md:hidden overflow-x-auto">
                    <div className="min-w-[700px] space-y-1">
                        {/* Month labels row */}
                        <div className="flex gap-[2px] mb-1">
                            {/* Empty space for day labels */}
                            <div className="w-[50px] pr-1.5"></div>

                            {/* Month labels container */}
                            <div className="flex-1  relative h-4">
                                {monthLabels.map((month) => {
                                    const position = (month.weekIndex / 52) * 100;
                                    return (
                                        <div
                                            key={month.weekIndex}
                                            className="absolute text-[11px] text-muted-foreground"
                                            style={{
                                                left: `${position}%`,
                                            }}
                                        >
                                            {month.label}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Heatmap grid */}
                        <div className="flex gap-[2px]">
                            {/* Day labels */}
                            <div className="flex flex-col gap-[2px] pr-1.5 w-[50px]">
                                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => (
                                    <div
                                        key={i}
                                        className="flex h-[9px] items-center justify-start text-[10px] text-muted-foreground"
                                    >
                                        {day}
                                    </div>
                                ))}
                            </div>

                            {/* Activity cells */}
                            <div className="flex gap-[2px]">
                                {gridData.map((week, weekIndex) => (
                                    <div key={weekIndex} className="flex flex-col gap-[2px]">
                                        {week.map((day, dayIndex) => (
                                            <div
                                                key={dayIndex}
                                                className={`h-[9px] w-[9px] rounded-sm ${getActivityColor(day.count)} transition-all`}
                                                title={`${format(day.date, 'MMM dd, yyyy')}: ${day.count} interview${day.count !== 1 ? 's' : ''}`}
                                            />
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Legend */}
                        <div className="flex items-center justify-end gap-2 pt-3">
                            <span className="text-xs text-muted-foreground">Less</span>
                            <div className="flex gap-[2px]">
                                {[0, 1, 2, 3, 4].map((level) => (
                                    <div
                                        key={level}
                                        className={`h-[9px] w-[9px] rounded-sm ${getActivityColor(level)}`}
                                    />
                                ))}
                            </div>
                            <span className="text-xs text-muted-foreground">More</span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
