"use client";

import { PerformanceData } from '@/types/dashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTheme } from 'next-themes';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    ReferenceLine,
} from 'recharts';
import { format } from 'date-fns';

interface PerformanceChartProps {
    data: PerformanceData[];
}

export function PerformanceChart({ data }: PerformanceChartProps) {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    // Calculate average score
    const avgScore = data.reduce((sum, item) => sum + item.score, 0) / data.length;

    // Calculate performance improvement
    const recentAvg = data.slice(-5).reduce((sum, item) => sum + item.score, 0) / 5;
    const olderAvg = data.slice(0, 5).reduce((sum, item) => sum + item.score, 0) / 5;
    const improvement = ((recentAvg - olderAvg) / olderAvg) * 100;

    // Custom tooltip
    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="rounded-lg border border-border bg-card p-3 shadow-lg">
                    <p className="text-sm font-medium text-foreground">{data.problem}</p>
                    <p className="text-xs text-muted-foreground">{format(new Date(data.date), 'MMM dd, yyyy')}</p>
                    <p className="text-xs text-muted-foreground">Topic: {data.topic}</p>
                    <p className="text-sm font-bold text-foreground mt-1">Score: {data.score}/20</p>
                </div>
            );
        }
        return null;
    };

    return (
        <Card className="rounded-2xl border border-border bg-card shadow-lg">
            <CardHeader>
                <CardTitle>Performance Over Last 20 Interviews</CardTitle>
                <CardDescription>
                    {improvement > 0 ? (
                        <span className="text-green-600 dark:text-green-400">
                            Your performance improved by {improvement.toFixed(1)}% over the last 5 interviews 📈
                        </span>
                    ) : (
                        <span className="text-muted-foreground">
                            Track your progress and identify patterns
                        </span>
                    )}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                    <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke={isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}
                        />
                        <XAxis
                            dataKey="date"
                            tickFormatter={(value) => format(new Date(value), 'MMM dd')}
                            stroke={isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'}
                            style={{ fontSize: '12px' }}
                        />
                        <YAxis
                            domain={[0, 20]}
                            stroke={isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'}
                            style={{ fontSize: '12px' }}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <ReferenceLine
                            y={avgScore}
                            stroke={isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)'}
                            strokeDasharray="5 5"
                            label={{
                                value: `Avg: ${avgScore.toFixed(1)}`,
                                position: 'right',
                                fill: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
                                fontSize: 12,
                            }}
                        />
                        <Area
                            type="monotone"
                            dataKey="score"
                            stroke="hsl(var(--chart-1))"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorScore)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
