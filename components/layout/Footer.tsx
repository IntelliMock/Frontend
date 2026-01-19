"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Github, Twitter, Linkedin } from "lucide-react"

export function Footer() {
    const [year, setYear] = useState(2026)

    useEffect(() => {
        setYear(new Date().getFullYear())
    }, [])

    return (
        <footer className="border-t border-border/40 bg-background">
            <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                {/* Footer Links */}
                <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 md:grid-cols-4">
                    {/* Brand */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                            IntelliMock
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            AI-driven DSA mock interviews that replicate real technical interviews.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold">Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Features
                                </Link>
                            </li>
                            <li>
                                <Link href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
                                    How It Works
                                </Link>
                            </li>
                            <li>
                                <Link href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Pricing
                                </Link>
                            </li>
                            <li>
                                <Link href="#testimonials" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Testimonials
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold">Resources</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="#docs" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Documentation
                                </Link>
                            </li>
                            <li>
                                <Link href="#faq" className="text-muted-foreground hover:text-foreground transition-colors">
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Support
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold">Connect</h4>
                        <div className="flex gap-4">
                            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                                <Github className="h-5 w-5" />
                                <span className="sr-only">GitHub</span>
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                                <Twitter className="h-5 w-5" />
                                <span className="sr-only">Twitter</span>
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                                <Linkedin className="h-5 w-5" />
                                <span className="sr-only">LinkedIn</span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-8 border-t border-border/40 pt-8 text-center text-sm text-muted-foreground">
                    <p>&copy; {year} IntelliMock. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
