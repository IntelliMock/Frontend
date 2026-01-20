import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { WelcomeSection } from "@/components/dashboard/WelcomeSection"
import { PerformanceChart } from "@/components/dashboard/PerformanceChart"
import { QuickActions } from "@/components/dashboard/QuickActions"
import { InterviewHistory } from "@/components/dashboard/InterviewHistory"
import { ConsistencyHeatmap } from "@/components/dashboard/ConsistencyHeatmap"
import { AIInsights } from "@/components/dashboard/AIInsights"
import { getDummyDashboardData } from "@/lib/getDummyDashboardData"

export default async function DashboardPage() {
    const session = await auth()

    if (!session?.user) {
        redirect("/auth/login")
    }

    // Get dashboard data (using dummy data for now)
    const dashboardData = getDummyDashboardData()

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-gradient-to-br from-background to-muted">
                <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="space-y-8">
                        {/* Welcome Section with Quick Stats */}
                        <WelcomeSection user={session.user} stats={dashboardData.stats} />

                        {/* Performance Trend Chart */}
                        <PerformanceChart data={dashboardData.performance} />

                        {/* Quick Action Cards */}
                        <QuickActions hasActiveSession={dashboardData.hasActiveSession} />

                        {/* Interview History - Full Width */}
                        <InterviewHistory sessions={dashboardData.history} />

                        {/* Consistency Heatmap - Below Interview History */}
                        <ConsistencyHeatmap activity={dashboardData.activity} />

                        {/* AI Insights & Weak Areas */}
                        <AIInsights insights={dashboardData.aiInsights} />
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}
