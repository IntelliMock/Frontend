import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { SettingsLayout } from "@/components/settings/SettingsLayout"

export default async function SettingsPage() {
    const session = await auth()

    if (!session?.user) {
        redirect("/auth/login")
    }

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-gradient-to-br from-background to-muted">
                <SettingsLayout />
            </main>
            <Footer />
        </>
    )
}
