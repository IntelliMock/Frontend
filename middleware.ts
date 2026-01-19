import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
    const session = await auth()

    const isAuthPage = request.nextUrl.pathname.startsWith("/auth")
    const isProtectedRoute = request.nextUrl.pathname.startsWith("/dashboard")

    // Redirect authenticated users away from auth pages
    if (isAuthPage && session) {
        return NextResponse.redirect(new URL("/dashboard", request.url))
    }

    // Redirect unauthenticated users to login
    if (isProtectedRoute && !session) {
        const loginUrl = new URL("/auth/login", request.url)
        loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname)
        return NextResponse.redirect(loginUrl)
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/dashboard/:path*", "/auth/:path*"],
}
