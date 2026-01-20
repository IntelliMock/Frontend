"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, Calendar, Clock, Monitor, CheckCircle2 } from "lucide-react"
import { getUserProfile } from "@/lib/api/settings"
import { useToast } from "@/hooks/use-toast"
import { format } from "date-fns"

export function AccountOverviewSection() {
    const { toast } = useToast()
    const [loading, setLoading] = React.useState(true)
    const [profile, setProfile] = React.useState<any>(null)

    React.useEffect(() => {
        loadProfile()
    }, [])

    const loadProfile = async () => {
        try {
            const data = await getUserProfile()
            setProfile(data)
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to load account information",
                variant: "destructive",
            })
        } finally {
            setLoading(false)
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
                <CardTitle>Account Overview</CardTitle>
                <CardDescription>
                    View your account information and activity
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Account Created */}
                <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-muted">
                        <Calendar className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-medium">Account Created</p>
                        <p className="text-sm text-muted-foreground">
                            {profile?.createdAt
                                ? format(new Date(profile.createdAt), 'MMMM d, yyyy')
                                : 'Unknown'
                            }
                        </p>
                    </div>
                </div>

                {/* Last Login */}
                <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-muted">
                        <Clock className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-medium">Last Login</p>
                        <p className="text-sm text-muted-foreground">
                            {profile?.lastLogin
                                ? format(new Date(profile.lastLogin), 'MMMM d, yyyy \'at\' h:mm a')
                                : 'Never'
                            }
                        </p>
                    </div>
                </div>

                {/* Last Active Device */}
                <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-muted">
                        <Monitor className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-medium">Last Active Device</p>
                        <p className="text-sm text-muted-foreground">
                            {profile?.lastActiveDevice || 'Unknown'}
                        </p>
                    </div>
                </div>

                {/* Account Status */}
                <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-muted">
                        <CheckCircle2 className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-medium">Account Status</p>
                        <div className="mt-1">
                            <Badge
                                variant={profile?.accountStatus === 'active' ? 'default' : 'secondary'}
                                className="capitalize"
                            >
                                {profile?.accountStatus || 'Unknown'}
                            </Badge>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
