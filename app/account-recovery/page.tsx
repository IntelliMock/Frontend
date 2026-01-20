"use client"

import * as React from "react"
import { useSession, signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, CheckCircle2, XCircle } from "lucide-react"
import { recoverAccount } from "@/lib/api/settings"
import { useToast } from "@/hooks/use-toast"

export default function AccountRecoveryPage() {
    const { data: session, status } = useSession()
    const router = useRouter()
    const { toast } = useToast()
    const [recovering, setRecovering] = React.useState(false)
    const [recovered, setRecovered] = React.useState(false)
    const [error, setError] = React.useState<string | null>(null)

    // Redirect if not authenticated
    React.useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/")
        }
    }, [status, router])

    const handleRecover = async () => {
        setRecovering(true)
        setError(null)

        try {
            const result = await recoverAccount()
            setRecovered(true)
            toast({
                title: "Account Recovered!",
                description: result.message,
            })

            // Redirect to dashboard after 2 seconds
            setTimeout(() => {
                router.push("/dashboard")
            }, 2000)
        } catch (err: any) {
            const errorMessage = err.message || "Failed to recover account"
            setError(errorMessage)
            toast({
                title: "Recovery Failed",
                description: errorMessage,
                variant: "destructive",
            })
        } finally {
            setRecovering(false)
        }
    }

    if (status === "loading") {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background to-muted/20">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Account Recovery</CardTitle>
                    <CardDescription>
                        Restore your deleted IntelliMock account
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {!recovered && !error && (
                        <>
                            <div className="p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                                <p className="text-sm text-amber-900 dark:text-amber-100">
                                    Your account was marked for deletion. You have <strong>15 days</strong> from
                                    the deletion date to recover it before all data is permanently removed.
                                </p>
                            </div>

                            <div className="space-y-2">
                                <h3 className="font-medium">What will be restored:</h3>
                                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                                    <li>Your profile and account settings</li>
                                    <li>Interview history and progress</li>
                                    <li>All personal data and preferences</li>
                                </ul>
                            </div>

                            <Button
                                onClick={handleRecover}
                                disabled={recovering}
                                className="w-full"
                                size="lg"
                            >
                                {recovering ? (
                                    <>
                                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                        Recovering Account...
                                    </>
                                ) : (
                                    "Recover My Account"
                                )}
                            </Button>
                        </>
                    )}

                    {recovered && (
                        <div className="text-center space-y-4 py-4">
                            <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto" />
                            <div>
                                <h3 className="text-lg font-semibold text-green-700 dark:text-green-400">
                                    Account Recovered Successfully!
                                </h3>
                                <p className="text-sm text-muted-foreground mt-2">
                                    Redirecting you to the dashboard...
                                </p>
                            </div>
                        </div>
                    )}

                    {error && (
                        <div className="text-center space-y-4 py-4">
                            <XCircle className="h-16 w-16 text-destructive mx-auto" />
                            <div>
                                <h3 className="text-lg font-semibold text-destructive">
                                    Recovery Failed
                                </h3>
                                <p className="text-sm text-muted-foreground mt-2">
                                    {error}
                                </p>
                            </div>
                            <Button
                                variant="outline"
                                onClick={() => router.push("/")}
                                className="mt-4"
                            >
                                Return to Home
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
