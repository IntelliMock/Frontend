"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Loader2 } from "lucide-react"
import { getUserProfile, updatePrivacySettings } from "@/lib/api/settings"
import { useToast } from "@/hooks/use-toast"

export function PrivacySection() {
    const { toast } = useToast()
    const [loading, setLoading] = React.useState(true)
    const [updating, setUpdating] = React.useState(false)
    const [settings, setSettings] = React.useState({
        publicProfile: false,
        showOnLeaderboard: false,
    })

    React.useEffect(() => {
        loadSettings()
    }, [])

    const loadSettings = async () => {
        try {
            const data = await getUserProfile()
            setSettings({
                publicProfile: data.publicProfile,
                showOnLeaderboard: data.showOnLeaderboard,
            })
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to load privacy settings",
                variant: "destructive",
            })
        } finally {
            setLoading(false)
        }
    }

    const handleToggle = async (key: 'publicProfile' | 'showOnLeaderboard', value: boolean) => {
        const newSettings = { ...settings, [key]: value }
        setSettings(newSettings)
        setUpdating(true)

        try {
            await updatePrivacySettings(newSettings)
            toast({
                title: "Success",
                description: "Privacy settings updated",
            })
        } catch (error) {
            // Revert on error
            setSettings(settings)
            toast({
                title: "Error",
                description: "Failed to update privacy settings",
                variant: "destructive",
            })
        } finally {
            setUpdating(false)
        }
    }

    if (loading) {
        return (
            <Card>
                <CardContent className="flex items-center justify-center py-12">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </CardContent>
            </Card>
        )
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Privacy & Visibility</CardTitle>
                <CardDescription>
                    Control how your profile appears to others
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Public Profile */}
                <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-1">
                        <Label htmlFor="public-profile" className="text-base">
                            Public Profile
                        </Label>
                        <p className="text-sm text-muted-foreground">
                            Allow others to view your profile and interview statistics
                        </p>
                    </div>
                    <Switch
                        id="public-profile"
                        checked={settings.publicProfile}
                        onCheckedChange={(checked: boolean) => handleToggle('publicProfile', checked)}
                        disabled={updating}
                    />
                </div>

                {/* Show on Leaderboards */}
                <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-1">
                        <Label htmlFor="show-leaderboard" className="text-base">
                            Show on Leaderboards
                        </Label>
                        <p className="text-sm text-muted-foreground">
                            Display your performance on public leaderboards and rankings
                        </p>
                    </div>
                    <Switch
                        id="show-leaderboard"
                        checked={settings.showOnLeaderboard}
                        onCheckedChange={(checked: boolean) => handleToggle('showOnLeaderboard', checked)}
                        disabled={updating}
                    />
                </div>

                <div className="pt-4 border-t">
                    <p className="text-sm text-muted-foreground">
                        💡 Both settings are disabled by default to protect your privacy.
                        Enable them if you want to participate in the IntelliMock community.
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}
