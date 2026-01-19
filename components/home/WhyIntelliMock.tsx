"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Check, X } from "lucide-react"

const comparisons = [
    {
        feature: "Interview Simulation",
        intellimock: "Real-time AI interviewer with voice",
        others: "Static problem sets",
    },
    {
        feature: "Adaptive Learning",
        intellimock: "AI observes thinking patterns",
        others: "One-size-fits-all difficulty",
    },
    {
        feature: "Feedback Quality",
        intellimock: "Detailed analytics + communication review",
        others: "Basic test case results",
    },
    {
        feature: "Interview Pressure",
        intellimock: "Realistic time constraints & interruptions",
        others: "Practice at your own pace",
    },
]

export function WhyIntelliMock() {
    return (
        <section className="py-20 md:py-32 bg-muted/30">
            <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center space-y-4 mb-16"
                >
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                        Why Choose{" "}
                        <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                            IntelliMock?
                        </span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Go beyond static practice problems with real interview simulation
                    </p>
                </motion.div>

                <div className="grid gap-12 lg:grid-cols-2 items-start">
                    {/* Comparison Table */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <Card className="border-border/50">
                            <CardContent className="p-6">
                                <div className="space-y-4">
                                    <div className="grid grid-cols-3 gap-4 pb-4 border-b border-border/50">
                                        <div className="font-semibold">Feature</div>
                                        <div className="font-semibold text-primary">IntelliMock</div>
                                        <div className="font-semibold text-muted-foreground">Others</div>
                                    </div>
                                    {comparisons.map((item, index) => (
                                        <div key={index} className="grid grid-cols-3 gap-4 text-sm">
                                            <div className="font-medium">{item.feature}</div>
                                            <div className="flex items-start gap-2">
                                                <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                                                <span className="text-muted-foreground">{item.intellimock}</span>
                                            </div>
                                            <div className="flex items-start gap-2">
                                                <X className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                                                <span className="text-muted-foreground">{item.others}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Key Differentiators */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="item-1">
                                <AccordionTrigger className="text-left">
                                    No Static Practice Problems
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground">
                                    Every interview is dynamic and unique. The AI adapts questions based on your responses and performance, just like a real interviewer would.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2">
                                <AccordionTrigger className="text-left">
                                    AI Observes Thinking Patterns
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground">
                                    Our AI doesn't just check if your code works—it analyzes how you think, communicate, and approach problems under pressure.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-3">
                                <AccordionTrigger className="text-left">
                                    Interviewer-Style Interruptions
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground">
                                    Get comfortable with follow-up questions, clarifications, and hints—exactly as they happen in real interviews.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-4">
                                <AccordionTrigger className="text-left">
                                    Real Interview Pressure Simulation
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground">
                                    Time constraints, live coding, and real-time evaluation create the authentic pressure you'll face in actual technical interviews.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
