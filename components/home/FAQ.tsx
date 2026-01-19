"use client"

import { motion } from "framer-motion"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
    {
        question: "Is the interview really in real-time?",
        answer: "Yes! IntelliMock provides live, real-time interviews with our AI interviewer. You'll experience the same pressure and dynamics as an actual technical interview, including follow-up questions and time constraints.",
    },
    {
        question: "Does it support voice interaction?",
        answer: "Absolutely. Our Pro plan includes voice interaction with the AI interviewer. You can speak your thoughts out loud, explain your approach verbally, and receive voice responses—just like a real interview.",
    },
    {
        question: "Is IntelliMock suitable for freshers?",
        answer: "Yes! IntelliMock adapts to your skill level. Whether you're a fresher or an experienced developer, our adaptive difficulty engine ensures you get questions that match your current abilities and help you improve.",
    },
    {
        question: "How does pricing work?",
        answer: "We offer a free plan with 3 mock interviews per month, perfect for getting started. Our Pro plan at ₹499/month gives you unlimited interviews, voice interaction, advanced analytics, and more. You can start with the free plan and upgrade anytime.",
    },
    {
        question: "How accurate is the AI feedback?",
        answer: "Our AI is trained on thousands of real technical interviews and evaluates multiple dimensions: code quality, problem-solving approach, communication skills, and time management. The feedback is detailed, actionable, and aligned with industry standards.",
    },
    {
        question: "Can I practice behavioral interviews too?",
        answer: "Yes! IntelliMock includes both technical DSA interviews and behavioral interview practice. This comprehensive approach ensures you're prepared for all aspects of the interview process.",
    },
    {
        question: "What programming languages are supported?",
        answer: "We support all major programming languages including Python, JavaScript, Java, C++, Go, and more. You can choose your preferred language for each interview session.",
    },
    {
        question: "Can I review my past interviews?",
        answer: "Pro users get access to interview recording and playback features. You can review your code, responses, and AI feedback from previous sessions to track your improvement over time.",
    },
]

export function FAQ() {
    return (
        <section id="faq" className="py-20 md:py-32 bg-muted/30">
            <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center space-y-4 mb-16"
                >
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                        Frequently Asked{" "}
                        <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                            Questions
                        </span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Everything you need to know about IntelliMock
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="max-w-3xl mx-auto"
                >
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map((faq, index) => (
                            <AccordionItem key={index} value={`item-${index}`}>
                                <AccordionTrigger className="text-left">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </motion.div>
            </div>
        </section>
    )
}
