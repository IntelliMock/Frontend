import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Hero } from "@/components/home/Hero"
import { SocialProof } from "@/components/home/SocialProof"
import { Features } from "@/components/home/Features"
import { WhyIntelliMock } from "@/components/home/WhyIntelliMock"
import { HowItWorks } from "@/components/home/HowItWorks"
import { LivePreview } from "@/components/home/LivePreview"
import { Testimonials } from "@/components/home/Testimonials"
import { Pricing } from "@/components/home/Pricing"
import { FAQ } from "@/components/home/FAQ"
import { CTA } from "@/components/home/CTA"

export default function Page() {
    return (
        <>
            <Navbar />
            <main>
                <Hero />
                <SocialProof />
                <Features />
                <WhyIntelliMock />
                <HowItWorks />
                <LivePreview />
                <Testimonials />
                <Pricing />
                <FAQ />
                <CTA />
            </main>
            <Footer />
        </>
    )
}