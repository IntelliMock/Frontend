import { AIInsight } from '@/types/dashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Bot, AlertCircle, Lightbulb } from 'lucide-react';

interface AIInsightsProps {
    insights: AIInsight;
}

export function AIInsights({ insights }: AIInsightsProps) {
    return (
        <Card className="rounded-2xl border border-border bg-card shadow-lg">
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Bot className="h-5 w-5 text-primary" />
                    <CardTitle>AI Insights & Recommendations</CardTitle>
                </div>
                <CardDescription>Personalized feedback based on your performance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Areas for Improvement & Common Mistakes - Side by side on desktop */}
                <div className="flex flex-col md:flex-row justify-between gap-12">
                    {/* Weak Topics */}
                    <div className="flex-1 space-y-4">
                        <div className="flex items-center gap-2">
                            <AlertCircle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                            <h3 className="font-semibold text-foreground">Areas for Improvement</h3>
                        </div>
                        <div className="space-y-3">
                            {insights.weakTopics.map((topic) => (
                                <div key={topic.name} className="space-y-2">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="font-medium text-foreground">{topic.name}</span>
                                        <span className="text-muted-foreground">{topic.errorRate}% error rate</span>
                                    </div>
                                    <Progress value={topic.errorRate} className="h-2" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Common Mistakes */}
                    <div className="flex-1 space-y-3">
                        <h3 className="font-semibold text-foreground">Common Mistakes</h3>
                        <ul className="space-y-2">
                            {insights.commonMistakes.map((mistake, index) => (
                                <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-muted-foreground" />
                                    <span>{mistake}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* AI Recommendation */}
                <div className="rounded-lg bg-accent/10 dark:bg-accent/20 p-4">
                    <div className="flex items-start gap-3">
                        <div className="rounded-lg bg-primary p-2">
                            <Lightbulb className="h-4 w-4 text-primary-foreground" />
                        </div>
                        <div className="flex-1 space-y-1">
                            <p className="font-semibold text-foreground">AI Recommendation</p>
                            <p className="text-sm text-muted-foreground">{insights.recommendation}</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
