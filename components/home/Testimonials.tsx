"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Quote } from "lucide-react"

const testimonials = [
    {
        name: "Priya Sharma",
        role: "SDE @ Amazon",
        initials: "PS",
        quote: "IntelliMock's AI interviewer felt incredibly realistic. The adaptive hints helped me improve without feeling like I was cheating. Got my Amazon offer after 2 weeks of practice!",
    },
    {
        name: "Rahul Verma",
        role: "Final Year Student",
        initials: "RV",
        quote: "The real-time feedback on my communication was a game-changer. I went from nervous wreck to confident problem-solver in my actual interviews.",
    },
    {
        name: "Ananya Gupta",
        role: "SDE-2 @ Microsoft",
        initials: "AG",
        quote: "Best interview prep platform I've used. The voice interaction made it feel like talking to a real interviewer. Highly recommend for anyone serious about placements.",
    },
    {
        name: "Arjun Mehta",
        role: "Software Engineer @ Google",
        initials: "AM",
        quote: "The analytics dashboard showed me exactly where I was weak. Fixed my time management issues and landed my dream job at Google!",
    },
    {
        name: "Sneha Patel",
        role: "SDE @ Flipkart",
        initials: "SP",
        quote: "IntelliMock's adaptive difficulty kept me challenged at the right level. The behavioral interview practice was surprisingly helpful too.",
    },
    {
        name: "Vikram Singh",
        role: "Tech Lead @ Zomato",
        initials: "VS",
        quote: "Even as an experienced developer, IntelliMock helped me prepare for senior roles. The interview pressure simulation is spot-on.",
    },
]

export function Testimonials() {
    return (
        <section id="testimonials" className="py-20 md:py-32 bg-muted/30">
            <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center space-y-4 mb-16"
                >
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                        Loved by{" "}
                        <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                            Developers Worldwide
                        </span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        See how IntelliMock helped them land their dream jobs
                    </p>
                </motion.div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card className="h-full border-border/50 hover:border-primary/50 transition-all">
                                <CardContent className="p-6 space-y-4">
                                    {/* Person details at top */}
                                    <div className="flex items-center gap-3">
                                        <Avatar>
                                            <AvatarFallback className="bg-primary/10 text-primary">
                                                {testimonial.initials}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-semibold">{testimonial.name}</p>
                                            <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                                        </div>
                                    </div>

                                    {/* Quote icon and text */}
                                    <div className="space-y-2">
                                        {/* <Quote className="h-8 w-8 text-primary/20" /> */}
                                        <p className="text-muted-foreground italic">
                                            "{testimonial.quote}"
                                        </p>
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
