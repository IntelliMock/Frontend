"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Code2, MessageSquare, Lightbulb } from "lucide-react"

export function LivePreview() {
    return (
        <section className="py-20 md:py-32">
            <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center space-y-4 mb-16"
                >
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                        See IntelliMock{" "}
                        <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                            In Action
                        </span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Experience the full interview flow from start to finish
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="max-w-5xl mx-auto"
                >
                    <Card className="border-border/50 overflow-hidden">
                        <div className="grid md:grid-cols-2 gap-0">
                            {/* Left Panel - Code Editor */}
                            <div className="bg-card p-6 border-r border-border/50">
                                <div className="flex items-center gap-2 mb-4">
                                    <Code2 className="h-5 w-5 text-primary" />
                                    <h3 className="font-semibold">Code Editor</h3>
                                    <Badge variant="secondary" className="ml-auto text-xs">
                                        <Play className="h-3 w-3 mr-1" />
                                        Live
                                    </Badge>
                                </div>
                                <div className="space-y-3 font-mono text-sm bg-muted/50 rounded-lg p-4">
                                    <div className="flex gap-3">
                                        <span className="text-muted-foreground select-none">1</span>
                                        <span>
                                            <span className="text-purple-400">function</span>{" "}
                                            <span className="text-blue-400">twoSum</span>
                                            <span className="text-muted-foreground">(nums, target)</span>{" "}
                                            <span>{"{"}</span>
                                        </span>
                                    </div>
                                    <div className="flex gap-3">
                                        <span className="text-muted-foreground select-none">2</span>
                                        <span className="ml-4">
                                            <span className="text-purple-400">const</span> map{" "}
                                            <span className="text-muted-foreground">=</span>{" "}
                                            <span className="text-purple-400">new</span>{" "}
                                            <span className="text-blue-400">Map</span>
                                            <span className="text-muted-foreground">();</span>
                                        </span>
                                    </div>
                                    <div className="flex gap-3">
                                        <span className="text-muted-foreground select-none">3</span>
                                        <span className="ml-4">
                                            <span className="text-purple-400">for</span>{" "}
                                            <span className="text-muted-foreground">(</span>
                                            <span className="text-purple-400">let</span> i{" "}
                                            <span className="text-muted-foreground">= 0; i &lt; nums.length; i++)</span>{" "}
                                            <span>{"{"}</span>
                                        </span>
                                    </div>
                                    <div className="flex gap-3">
                                        <span className="text-muted-foreground select-none">4</span>
                                        <span className="ml-8">
                                            <span className="text-purple-400">const</span> complement{" "}
                                            <span className="text-muted-foreground">= target - nums[i];</span>
                                        </span>
                                    </div>
                                    <div className="flex gap-3">
                                        <span className="text-muted-foreground select-none">5</span>
                                        <span className="ml-8 text-muted-foreground/50">
                      // Check if complement exists...
                                        </span>
                                    </div>
                                    <div className="flex gap-3">
                                        <span className="text-muted-foreground select-none">6</span>
                                        <span className="ml-4">
                                            <span>{"}"}</span>
                                        </span>
                                    </div>
                                    <div className="flex gap-3">
                                        <span className="text-muted-foreground select-none">7</span>
                                        <span>
                                            <span>{"}"}</span>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Right Panel - AI Interaction */}
                            <div className="bg-card p-6">
                                <div className="space-y-6">
                                    {/* AI Chat */}
                                    <div>
                                        <div className="flex items-center gap-2 mb-4">
                                            <MessageSquare className="h-5 w-5 text-primary" />
                                            <h3 className="font-semibold">AI Interviewer</h3>
                                        </div>
                                        <div className="space-y-3">
                                            <div className="bg-muted/50 rounded-lg p-3">
                                                <p className="text-sm text-muted-foreground">
                                                    "Great start! Can you explain the time complexity of your approach?"
                                                </p>
                                            </div>
                                            <div className="bg-primary/10 rounded-lg p-3 ml-4">
                                                <p className="text-sm">
                                                    "This would be O(n) time and O(n) space using a hash map..."
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Hint Panel */}
                                    <div>
                                        <div className="flex items-center gap-2 mb-4">
                                            <Lightbulb className="h-5 w-5 text-primary" />
                                            <h3 className="font-semibold">Adaptive Hints</h3>
                                        </div>
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.5, delay: 1 }}
                                            className="bg-primary/5 border border-primary/20 rounded-lg p-3"
                                        >
                                            <p className="text-xs font-semibold text-primary mb-1">
                                                💡 Hint Available
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                Consider what data structure allows O(1) lookup time
                                            </p>
                                        </motion.div>
                                    </div>

                                    {/* Stats */}
                                    <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border/50">
                                        <div className="text-center">
                                            <p className="text-2xl font-bold text-primary">35:42</p>
                                            <p className="text-xs text-muted-foreground">Time Remaining</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-2xl font-bold text-primary">2/3</p>
                                            <p className="text-xs text-muted-foreground">Hints Used</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Caption */}
                        <div className="bg-muted/30 px-6 py-4 border-t border-border/50">
                            <p className="text-sm text-muted-foreground text-center">
                                <strong className="text-foreground">Real-time interview flow:</strong> Code in the editor, communicate with AI, receive adaptive hints, and get instant feedback—all in one seamless experience.
                            </p>
                        </div>
                    </Card>
                </motion.div>
            </div>
        </section>
    )
}
