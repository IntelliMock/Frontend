"use client"

import * as React from "react"
import { useSession } from "next-auth/react"
import { SettingsNav } from "./SettingsNav"
import { ProfileSection } from "./sections/ProfileSection"
import { AccountOverviewSection } from "./sections/AccountOverviewSection"
import { LinkedAccountsSection } from "./sections/LinkedAccountsSection"
import { PrivacySection } from "./sections/PrivacySection"
import { SecuritySection } from "./sections/SecuritySection"
import { DangerZoneSection } from "./sections/DangerZoneSection"
import { setBackendToken } from "@/lib/api/settings"

export type SettingsSectionId =
    | 'profile'
    | 'account'
    | 'linked-accounts'
    | 'privacy'
    | 'security'
    | 'danger-zone'

export function SettingsLayout() {
    const [activeSection, setActiveSection] = React.useState<SettingsSectionId>('profile')
    const { data: session, status } = useSession()

    // Set the backend token when session is available
    React.useEffect(() => {
        if (session) {
            const backendToken = (session as any).backendToken
            setBackendToken(backendToken || null)
        }
    }, [session, status])

    // Show loading state while session is loading
    if (status === 'loading') {
        return (
            <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                    <p className="text-muted-foreground mt-2">
                        Loading your settings...
                    </p>
                </div>
            </div>
        )
    }

    // Don't render sections until we have a session with token
    if (!session || !(session as any).backendToken) {
        return (
            <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                    <p className="text-muted-foreground mt-2">
                        Please log in to access settings
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                <p className="text-muted-foreground mt-2">
                    Manage your account settings and preferences
                </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Left Sidebar Navigation */}
                <aside className="lg:w-64 flex-shrink-0">
                    <SettingsNav
                        activeSection={activeSection}
                        onSectionChange={setActiveSection}
                    />
                </aside>

                {/* Right Panel Content */}
                <div className="flex-1 space-y-6">
                    {activeSection === 'profile' && <ProfileSection />}
                    {activeSection === 'account' && <AccountOverviewSection />}
                    {activeSection === 'linked-accounts' && <LinkedAccountsSection />}
                    {activeSection === 'privacy' && <PrivacySection />}
                    {activeSection === 'security' && <SecuritySection />}
                    {activeSection === 'danger-zone' && <DangerZoneSection />}
                </div>
            </div>
        </div>
    )
}
