"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"

const plans = [
    {
        name: "Free",
        price: "₹0",
        description: "Perfect for trying out IntelliMock",
        features: [
            "3 mock interviews per month",
            "Basic AI interviewer",
            "Standard difficulty questions",
            "Basic analytics",
        ],
        cta: "Get Started",
        variant: "outline" as const,
    },
    {
        name: "Pro",
        price: "₹499",
        period: "/month",
        description: "For serious interview preparation",
        features: [
            "Unlimited mock interviews",
            "Advanced AI with voice",
            "Adaptive difficulty engine",
            "Detailed analytics dashboard",
            "Behavioral interview practice",
            "Priority support",
            "Interview recording & playback",
        ],
        cta: "Start Free Trial",
        variant: "default" as const,
        popular: true,
    },
]

export function Pricing() {
    return (
        <section id="pricing" className="py-20 md:py-32">
            <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center space-y-4 mb-16"
                >
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                        Simple,{" "}
                        <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                            Transparent Pricing
                        </span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Start free, upgrade when you're ready
                    </p>
                </motion.div>

                <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="relative"
                        >
                            {plan.popular && (
                                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                                    Most Popular
                                </Badge>
                            )}
                            <Card className={`h-full ${plan.popular ? 'border-primary shadow-lg' : 'border-border/50'}`}>
                                <CardHeader className="text-center pb-8">
                                    <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                                    <div className="flex items-baseline justify-center gap-1">
                                        <span className="text-4xl font-bold">{plan.price}</span>
                                        {plan.period && (
                                            <span className="text-muted-foreground">{plan.period}</span>
                                        )}
                                    </div>
                                    <CardDescription className="mt-2">{plan.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <ul className="space-y-3">
                                        {plan.features.map((feature) => (
                                            <li key={feature} className="flex items-start gap-3">
                                                <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                                <span className="text-sm text-muted-foreground">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <Button className="w-full" variant={plan.variant} size="lg">
                                        {plan.cta}
                                    </Button>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
