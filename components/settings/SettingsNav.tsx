"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { User, FileText, Link2, Shield, Lock, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"
import type { SettingsSectionId } from "./SettingsLayout"

interface SettingsNavProps {
    activeSection: SettingsSectionId
    onSectionChange: (section: SettingsSectionId) => void
}

const navItems = [
    { id: 'profile' as const, label: 'Profile', icon: User },
    { id: 'account' as const, label: 'Account', icon: FileText },
    { id: 'linked-accounts' as const, label: 'Linked Accounts', icon: Link2 },
    { id: 'privacy' as const, label: 'Privacy', icon: Shield },
    { id: 'security' as const, label: 'Security', icon: Lock },
    { id: 'danger-zone' as const, label: 'Danger Zone', icon: AlertTriangle },
]

export function SettingsNav({ activeSection, onSectionChange }: SettingsNavProps) {
    return (
        <nav className="space-y-1">
            {navItems.map((item, index) => {
                const Icon = item.icon
                const isActive = activeSection === item.id
                const isDangerZone = item.id === 'danger-zone'

                return (
                    <React.Fragment key={item.id}>
                        {isDangerZone && <Separator className="my-4" />}
                        <Button
                            variant={isActive ? "secondary" : "ghost"}
                            className={cn(
                                "w-full justify-start gap-3",
                                isDangerZone && "text-destructive hover:text-destructive hover:bg-destructive/10"
                            )}
                            onClick={() => onSectionChange(item.id)}
                        >
                            <Icon className="h-4 w-4" />
                            {item.label}
                        </Button>
                    </React.Fragment>
                )
            })}
        </nav>
    )
}
