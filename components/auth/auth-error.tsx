"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

interface AuthErrorProps {
    error: string | null
}

export function AuthError({ error }: AuthErrorProps) {
    if (!error) return null

    const errorMessages: Record<string, string> = {
        Configuration: "There is a problem with the server configuration.",
        AccessDenied: "You do not have permission to sign in.",
        Verification: "The verification token has expired or has already been used.",
        OAuthSignin: "Error in constructing an authorization URL.",
        OAuthCallback: "Error in handling the response from the OAuth provider.",
        OAuthCreateAccount: "Could not create OAuth provider user in the database.",
        EmailCreateAccount: "Could not create email provider user in the database.",
        Callback: "Error in the OAuth callback handler route.",
        OAuthAccountNotLinked: "Email already exists with a different provider.",
        EmailSignin: "Check your email address.",
        CredentialsSignin: "Sign in failed. Check the details you provided are correct.",
        SessionRequired: "Please sign in to access this page.",
        Default: "Unable to sign in.",
    }

    const message = errorMessages[error] || errorMessages.Default

    return (
        <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Authentication Error</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
        </Alert>
    )
}
