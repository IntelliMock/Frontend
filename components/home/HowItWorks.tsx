"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { UserPlus, Target, Play, BarChart } from "lucide-react"

const steps = [
    {
        icon: UserPlus,
        title: "Create Account",
        description: "Sign up in seconds with your email or Google account",
    },
    {
        icon: Target,
        title: "Choose Role & Difficulty",
        description: "Select your target role and current skill level",
    },
    {
        icon: Play,
        title: "Start Live AI Interview",
        description: "Jump into a realistic mock interview with our AI interviewer",
    },
    {
        icon: BarChart,
        title: "Receive Feedback & Score",
        description: "Get detailed analytics and personalized improvement suggestions",
    },
]

export function HowItWorks() {
    return (
        <section id="how-it-works" className="py-16 md:py-20">
            <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center space-y-3 mb-12"
                >
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                        Get Started in{" "}
                        <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                            4 Simple Steps
                        </span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        From signup to your first interview in under 5 minutes
                    </p>
                </motion.div>

                <div className="grid gap-6 md:grid-cols-2 lg:gap-8 max-w-5xl mx-auto">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{
                                duration: 0.5,
                                delay: index * 0.15,
                                ease: [0.25, 0.4, 0.25, 1]
                            }}
                        >
                            <Card className="border-border/50 hover:border-primary/50 transition-all h-full group">
                                <CardContent className="p-6">
                                    <div className="flex items-start gap-4">
                                        {/* Step number */}
                                        <div className="relative flex-shrink-0">
                                            <div className="rounded-full bg-primary/10 w-14 h-14 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                                <step.icon className="h-7 w-7 text-primary" />
                                            </div>
                                            <div className="absolute -bottom-1 -right-1 rounded-full bg-primary text-primary-foreground w-6 h-6 flex items-center justify-center text-xs font-bold">
                                                {index + 1}
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 pt-1">
                                            <h3 className="text-lg font-bold mb-1.5">{step.title}</h3>
                                            <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
