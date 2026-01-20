"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Loader2, Monitor, MapPin } from "lucide-react"
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
import { getActiveSessions, revokeAllSessions } from "@/lib/api/settings"
import { useToast } from "@/hooks/use-toast"
import { format } from "date-fns"

export function SecuritySection() {
    const { toast } = useToast()
    const [loading, setLoading] = React.useState(true)
    const [revoking, setRevoking] = React.useState(false)
    const [showRevokeDialog, setShowRevokeDialog] = React.useState(false)
    const [sessions, setSessions] = React.useState<any[]>([])

    React.useEffect(() => {
        loadSessions()
    }, [])

    const loadSessions = async () => {
        try {
            const data = await getActiveSessions()
            setSessions(data)
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to load active sessions",
                variant: "destructive",
            })
        } finally {
            setLoading(false)
        }
    }

    const handleRevokeAll = async () => {
        setRevoking(true)
        try {
            await revokeAllSessions()
            toast({
                title: "Success",
                description: "All sessions have been revoked. You will need to sign in again.",
            })
            // Reload sessions after a delay
            setTimeout(() => {
                loadSessions()
            }, 1000)
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to revoke sessions",
                variant: "destructive",
            })
        } finally {
            setRevoking(false)
            setShowRevokeDialog(false)
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
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Security</CardTitle>
                    <CardDescription>
                        Manage your account security and active sessions
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Authentication Method */}
                    <div>
                        <h3 className="text-sm font-medium mb-2">Authentication Method</h3>
                        <div className="p-4 bg-muted rounded-lg">
                            <p className="text-sm">
                                <span className="font-medium">OAuth Authentication</span>
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                                Your account is secured through OAuth providers (Google, GitHub).
                                No password is stored in IntelliMock.
                            </p>
                        </div>
                    </div>

                    {/* Active Sessions */}
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-medium">Active Sessions</h3>
                            <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => setShowRevokeDialog(true)}
                                disabled={sessions.length === 0}
                            >
                                Sign Out All Devices
                            </Button>
                        </div>

                        {sessions.length === 0 ? (
                            <div className="p-8 text-center border rounded-lg border-dashed">
                                <p className="text-sm text-muted-foreground">
                                    No active sessions found
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {sessions.map((session) => (
                                    <div
                                        key={session.id}
                                        className="flex items-start gap-4 p-4 border rounded-lg"
                                    >
                                        <div className="p-2 rounded-lg bg-muted">
                                            <Monitor className="h-5 w-5" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <p className="font-medium text-sm">{session.device}</p>
                                                {session.isCurrent && (
                                                    <Badge variant="secondary" className="text-xs">
                                                        Current
                                                    </Badge>
                                                )}
                                            </div>
                                            <p className="text-sm text-muted-foreground">
                                                {session.browser}
                                            </p>
                                            {session.location && (
                                                <div className="flex items-center gap-1 mt-1">
                                                    <MapPin className="h-3 w-3 text-muted-foreground" />
                                                    <p className="text-xs text-muted-foreground">
                                                        {session.location}
                                                    </p>
                                                </div>
                                            )}
                                            <p className="text-xs text-muted-foreground mt-1">
                                                Last active: {format(new Date(session.lastActivity), 'MMM d, yyyy \'at\' h:mm a')}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Revoke All Sessions Dialog */}
            <AlertDialog open={showRevokeDialog} onOpenChange={setShowRevokeDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Sign Out from All Devices?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will sign you out from all devices and browsers where you're currently logged in.
                            You'll need to sign in again on each device.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleRevokeAll} disabled={revoking}>
                            {revoking && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                            Sign Out All Devices
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
