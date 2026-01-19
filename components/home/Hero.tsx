"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Sparkles } from "lucide-react"

export function Hero() {
    return (
        <section className="relative overflow-hidden py-20 md:py-28">
            {/* Background gradient */}
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />

            <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
                    {/* Left Column - Text Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-6"
                    >
                        <Badge variant="secondary" className="w-fit">
                            <Sparkles className="mr-2 h-3 w-3" />
                            AI-Powered Interview Platform
                        </Badge>

                        <div className="space-y-4">
                            <h1 className="text-3xl font-bold tracking-tight sm:text-5xl md:text-5xl lg:text-5xl">
                                Practice Real Technical Interviews with{" "}
                                <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                                    AI
                                </span>
                            </h1>

                            <p className="text-lg text-muted-foreground md:text-xl max-w-2xl">
                                Live DSA mock interviews with real-time questions, AI interviewer, voice interaction, and adaptive hints.
                            </p>
                        </div>

                        <div className="flex flex-col gap-4 sm:flex-row pt-2">
                            <Button size="lg" className="text-base group">
                                Start Free Mock
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Button>
                            <Button size="lg" variant="outline" className="text-base">
                                View Demo
                            </Button>
                        </div>

                        <p className="text-sm text-muted-foreground">
                            No credit card required • 5 min setup
                        </p>
                    </motion.div>

                    {/* Right Column - Mock UI Preview */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="relative rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-6 shadow-2xl">
                            {/* Code Editor Mock */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex gap-2">
                                        <div className="h-3 w-3 rounded-full bg-red-500" />
                                        <div className="h-3 w-3 rounded-full bg-yellow-500" />
                                        <div className="h-3 w-3 rounded-full bg-green-500" />
                                    </div>
                                    <Badge variant="secondary" className="text-xs">
                                        Live Interview
                                    </Badge>
                                </div>

                                {/* Code lines */}
                                <div className="space-y-2 font-mono text-sm">
                                    <div className="flex gap-4">
                                        <span className="text-muted-foreground">1</span>
                                        <span className="text-primary">function</span>
                                        <span>twoSum(nums, target) {"{"}</span>
                                    </div>
                                    <div className="flex gap-4">
                                        <span className="text-muted-foreground">2</span>
                                        <span className="ml-4">const map = new Map();</span>
                                    </div>
                                    <div className="flex gap-4">
                                        <span className="text-muted-foreground">3</span>
                                        <span className="ml-4 opacity-50">// Your code here...</span>
                                    </div>
                                </div>

                                {/* AI Interviewer Chat */}
                                <div className="mt-6 rounded-lg border border-border/50 bg-background/50 p-4">
                                    <div className="flex items-start gap-3">
                                        <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                                            <Sparkles className="h-4 w-4 text-primary" />
                                        </div>
                                        <div className="flex-1 space-y-1">
                                            <p className="text-xs font-semibold">AI Interviewer</p>
                                            <p className="text-sm text-muted-foreground">
                                                Can you explain your approach?
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Hint Panel */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.8 }}
                                    className="rounded-lg border border-primary/20 bg-primary/5 p-3"
                                >
                                    <p className="text-xs font-semibold text-primary">💡 Hint Available</p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        Consider using a hash map for O(n) time complexity
                                    </p>
                                </motion.div>
                            </div>
                        </div>

                        {/* Floating elements */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-4 -right-4 rounded-lg border border-border/50 bg-card px-4 py-2 shadow-lg"
                        >
                            <p className="text-xs font-semibold">⏱️ 45:00</p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
