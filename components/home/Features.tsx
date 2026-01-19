"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mic, Code, Lightbulb, BarChart3, Brain, MessageSquare } from "lucide-react"

const features = [
    {
        icon: MessageSquare,
        title: "AI Interviewer (Text + Voice)",
        description: "Natural conversation with AI that asks follow-up questions and evaluates your communication.",
    },
    {
        icon: Code,
        title: "Live Code Editor with Constraints",
        description: "Real coding environment with time limits and language restrictions, just like actual interviews.",
    },
    {
        icon: Lightbulb,
        title: "Real-Time Hint Engine",
        description: "Adaptive hints that appear only when needed, helping you learn without giving away solutions.",
    },
    {
        icon: Brain,
        title: "Adaptive Difficulty Engine",
        description: "Questions adjust based on your performance, ensuring optimal challenge level.",
    },
    {
        icon: Mic,
        title: "Behavioral + DSA Interviews",
        description: "Practice both technical coding and behavioral questions in one platform.",
    },
    {
        icon: BarChart3,
        title: "Interview Analytics Dashboard",
        description: "Detailed feedback on code quality, communication, problem-solving approach, and time management.",
    },
]

export function Features() {
    return (
        <section id="features" className="py-20 md:py-32">
            <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center space-y-4 mb-16"
                >
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                        Everything You Need to{" "}
                        <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                            Ace Your Interview
                        </span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        IntelliMock replicates real technical interviews with AI-powered features
                    </p>
                </motion.div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card className="h-full border-border/50 hover:border-primary/50 transition-all hover:shadow-lg">
                                <CardHeader>
                                    <div className="rounded-lg bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                                        <feature.icon className="h-6 w-6 text-primary" />
                                    </div>
                                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-base">
                                        {feature.description}
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
