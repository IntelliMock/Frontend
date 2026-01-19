"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTA() {
    return (
        <section className="py-20 md:py-32">
            <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="relative overflow-hidden rounded-3xl border border-border/50 bg-gradient-to-br from-primary/10 via-background to-background p-12 md:p-16 text-center"
                >
                    {/* Background decoration */}
                    <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />

                    <div className="space-y-6 max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                            Ready to Ace Your Next{" "}
                            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                                Technical Interview?
                            </span>
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            Join thousands of developers who have landed their dream jobs with IntelliMock
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                            <Button size="lg" className="text-base group">
                                Start Free Mock Interview
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Button>
                            <Button size="lg" variant="outline" className="text-base">
                                View Pricing
                            </Button>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            No credit card required • Get started in 2 minutes
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
