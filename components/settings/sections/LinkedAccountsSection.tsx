"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Loader2, Github, Mail } from "lucide-react"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { getUserProfile, disconnectOAuthProvider } from "@/lib/api/settings"
import { useToast } from "@/hooks/use-toast"
import { format } from "date-fns"

const providerIcons = {
    google: Mail,
    github: Github,
}

export function LinkedAccountsSection() {
    const { toast } = useToast()
    const [loading, setLoading] = React.useState(true)
    const [disconnecting, setDisconnecting] = React.useState(false)
    const [profile, setProfile] = React.useState<any>(null)
    const [providerToDisconnect, setProviderToDisconnect] = React.useState<string | null>(null)

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
                description: "Failed to load linked accounts",
                variant: "destructive",
            })
        } finally {
            setLoading(false)
        }
    }

    const handleDisconnect = async () => {
        if (!providerToDisconnect) return

        setDisconnecting(true)
        try {
            await disconnectOAuthProvider(providerToDisconnect)
            toast({
                title: "Success",
                description: "Provider disconnected successfully",
            })
            await loadProfile()
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.message || "Failed to disconnect provider",
                variant: "destructive",
            })
        } finally {
            setDisconnecting(false)
            setProviderToDisconnect(null)
        }
    }

    const linkedAccountsCount = profile?.linkedAccounts?.length || 0
    const canDisconnect = linkedAccountsCount > 1

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
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Linked Accounts</CardTitle>
                    <CardDescription>
                        Manage your OAuth provider connections
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {profile?.linkedAccounts?.map((account: any) => {
                        const Icon = providerIcons[account.provider as keyof typeof providerIcons] || Mail

                        return (
                            <div
                                key={account.provider}
                                className="flex items-center justify-between p-4 border rounded-lg"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="p-2 rounded-lg bg-muted">
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="font-medium capitalize">{account.provider}</p>
                                        <p className="text-sm text-muted-foreground">{account.email}</p>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            Connected {format(new Date(account.connectedAt), 'MMM d, yyyy')}
                                        </p>
                                    </div>
                                </div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    disabled={!canDisconnect}
                                    onClick={() => setProviderToDisconnect(account.provider)}
                                >
                                    Disconnect
                                </Button>
                            </div>
                        )
                    })}

                    {!canDisconnect && (
                        <div className="p-4 bg-muted rounded-lg">
                            <p className="text-sm text-muted-foreground">
                                ℹ️ You must have at least one OAuth provider connected to access your account.
                            </p>
                        </div>
                    )}

                    {/* Connect Additional Provider - Disabled for now */}
                    <Button variant="outline" className="w-full" disabled>
                        Connect Additional Provider
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">
                        Additional OAuth providers can be connected during sign-in
                    </p>
                </CardContent>
            </Card>

            {/* Disconnect Confirmation Dialog */}
            <AlertDialog open={!!providerToDisconnect} onOpenChange={() => setProviderToDisconnect(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Disconnect OAuth Provider?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to disconnect your {providerToDisconnect} account?
                            You can reconnect it later by signing in with {providerToDisconnect}.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDisconnect} disabled={disconnecting}>
                            {disconnecting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                            Disconnect
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
