"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Users, TrendingUp, Award } from "lucide-react"

const metrics = [
    {
        icon: Users,
        value: "10,000+",
        label: "Mock Interviews",
    },
    {
        icon: TrendingUp,
        value: "90%+",
        label: "Readiness Improvement",
    },
    {
        icon: Award,
        value: "500+",
        label: "Successful Placements",
    },
]

export function SocialProof() {
    return (
        <section className="py-12 md:py-16 border-y border-border/40 bg-muted/30">
            <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid gap-6 md:grid-cols-3">
                    {metrics.map((metric, index) => (
                        <motion.div
                            key={metric.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card className="border-border/50 hover:border-primary/50 transition-colors">
                                <CardContent className="flex items-center gap-4 p-6">
                                    <div className="rounded-full bg-primary/10 p-3">
                                        <metric.icon className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-3xl font-bold">{metric.value}</p>
                                        <p className="text-sm text-muted-foreground">{metric.label}</p>
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
