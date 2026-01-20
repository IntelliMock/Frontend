"use client"

import * as React from "react"
import { signOut } from "next-auth/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, Download, Trash2 } from "lucide-react"
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
import { exportUserData, deleteAccount } from "@/lib/api/settings"
import { useToast } from "@/hooks/use-toast"

export function DangerZoneSection() {
    const { toast } = useToast()
    const [exporting, setExporting] = React.useState(false)
    const [deleting, setDeleting] = React.useState(false)
    const [showDeleteDialog, setShowDeleteDialog] = React.useState(false)

    const handleExport = async () => {
        setExporting(true)
        try {
            const data = await exportUserData()

            // Create and download JSON file
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
            const url = URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = url
            link.download = `intellimock-data-${new Date().toISOString().split('T')[0]}.json`
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            URL.revokeObjectURL(url)

            toast({
                title: "Success",
                description: "Your data has been exported successfully",
            })
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to export data",
                variant: "destructive",
            })
        } finally {
            setExporting(false)
        }
    }


    const handleDelete = async () => {
        setDeleting(true)
        try {
            await deleteAccount()
            toast({
                title: "Account Deleted",
                description: "Your account has been deleted. You will be signed out now.",
            })

            // Sign out and redirect to home page
            setTimeout(async () => {
                await signOut({ callbackUrl: '/' })
            }, 1500)
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to delete account",
                variant: "destructive",
            })
            setDeleting(false)
            setShowDeleteDialog(false)
        }
    }


    return (
        <>
            <Card className="border-destructive">
                <CardHeader>
                    <CardTitle className="text-destructive">Danger Zone</CardTitle>
                    <CardDescription>
                        Irreversible actions that affect your account
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Export Data */}
                    <div className="p-4 border border-border rounded-lg space-y-3">
                        <div>
                            <h3 className="text-sm font-medium">Export Personal Data</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                                Download a copy of all your personal data stored in IntelliMock,
                                including profile information, interview history, and settings.
                            </p>
                        </div>
                        <Button
                            variant="outline"
                            onClick={handleExport}
                            disabled={exporting}
                        >
                            {exporting ? (
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            ) : (
                                <Download className="h-4 w-4 mr-2" />
                            )}
                            Export Data
                        </Button>
                    </div>

                    {/* Delete Account */}
                    <div className="p-4 border border-destructive rounded-lg bg-destructive/5 space-y-3">
                        <div>
                            <h3 className="text-sm font-medium text-destructive">
                                Delete Account
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1">
                                Mark your account for deletion. You'll have 15 days to recover it before
                                all data is permanently removed.
                            </p>
                        </div>
                        <div className="space-y-2">
                            <Button
                                variant="destructive"
                                onClick={() => setShowDeleteDialog(true)}
                            >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete My Account
                            </Button>
                            <p className="text-xs text-muted-foreground">
                                ⚠️ You'll be logged out immediately, but can recover your account
                                within 15 days before permanent deletion.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Delete Account Confirmation Dialog */}
            <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Your Account?</AlertDialogTitle>
                        <AlertDialogDescription asChild>
                            <div className="space-y-2">
                                <p>
                                    Your account will be marked for deletion and you will be logged out immediately.
                                </p>
                                <p className="text-amber-600 dark:text-amber-500 font-medium">
                                    ⏳ You have 15 days to recover your account before it's permanently deleted.
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    After 15 days, all your interview history, progress, and settings will be permanently removed.
                                </p>
                            </div>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            disabled={deleting}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            {deleting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                            Yes, Delete My Account
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
