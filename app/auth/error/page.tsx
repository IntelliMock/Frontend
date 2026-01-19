import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

export default async function AuthErrorPage({
    searchParams,
}: {
    searchParams: Promise<{ error?: string }>
}) {
    const params = await searchParams

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1 text-center">
                    <div className="flex justify-center mb-4">
                        <div className="rounded-full bg-destructive/10 p-3">
                            <AlertCircle className="h-8 w-8 text-destructive" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-bold">Authentication Error</CardTitle>
                    <CardDescription>
                        {params.error || "Something went wrong during authentication"}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Button asChild className="w-full">
                        <Link href="/auth/login">
                            Try Again
                        </Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full">
                        <Link href="/">
                            Go Home
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}
