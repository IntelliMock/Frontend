"use client";

import { ActivityDay } from '@/types/dashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTheme } from 'next-themes';
import { subDays, format, startOfWeek, addDays } from 'date-fns';

interface ConsistencyHeatmapProps {
    activity: ActivityDay[];
}

export function ConsistencyHeatmap({ activity }: ConsistencyHeatmapProps) {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    // Get activity count for a specific date
    const getActivityCount = (date: Date) => {
        const dateStr = format(date, 'yyyy-MM-dd');
        const found = activity.find((a) => a.date === dateStr);
        return found ? found.count : 0;
    };

    // Get color based on activity count
    const getActivityColor = (count: number) => {
        if (count === 0) return isDark ? 'bg-muted' : 'bg-gray-100';
        if (count === 1) return isDark ? 'bg-green-900/30' : 'bg-green-100';
        if (count === 2) return isDark ? 'bg-green-700/50' : 'bg-green-300';
        return isDark ? 'bg-green-500' : 'bg-green-500';
    };

    // Generate grid data (last 13 weeks)
    const weeks = 13;
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

    const dayLabels = ['Mon', 'Wed', 'Fri'];

    return (
        <Card className="rounded-2xl border border-border bg-card shadow-lg">
            <CardHeader>
                <CardTitle>Consistency</CardTitle>
                <CardDescription>Your activity over the last 90 days</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    {/* Day labels */}
                    <div className="flex gap-1">
                        <div className="w-8" />
                        {dayLabels.map((label, i) => (
                            <div key={label} className="flex-1 text-center text-xs text-muted-foreground">
                                {i === 0 && label}
                                {i === 1 && label}
                                {i === 2 && label}
                            </div>
                        ))}
                    </div>

                    {/* Heatmap grid */}
                    <div className="flex gap-1">
                        {/* Week day labels */}
                        <div className="flex flex-col gap-1">
                            {['M', '', 'W', '', 'F', '', 'S'].map((day, i) => (
                                <div
                                    key={i}
                                    className="flex h-3 w-8 items-center text-xs text-muted-foreground"
                                >
                                    {day}
                                </div>
                            ))}
                        </div>

                        {/* Activity cells */}
                        {gridData.map((week, weekIndex) => (
                            <div key={weekIndex} className="flex flex-1 flex-col gap-1">
                                {week.map((day, dayIndex) => (
                                    <div
                                        key={dayIndex}
                                        className={`h-3 rounded-sm ${getActivityColor(day.count)} transition-colors hover:ring-2 hover:ring-primary`}
                                        title={`${format(day.date, 'MMM dd, yyyy')}: ${day.count} interview${day.count !== 1 ? 's' : ''}`}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>

                    {/* Legend */}
                    <div className="flex items-center justify-end gap-2 pt-4">
                        <span className="text-xs text-muted-foreground">Less</span>
                        <div className="flex gap-1">
                            {[0, 1, 2, 3].map((level) => (
                                <div
                                    key={level}
                                    className={`h-3 w-3 rounded-sm ${getActivityColor(level)}`}
                                />
                            ))}
                        </div>
                        <span className="text-xs text-muted-foreground">More</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
