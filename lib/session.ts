import { auth } from "@/lib/auth"

export async function getSession() {
    return await auth()
}

export async function getBackendToken() {
    const session = await auth()
    return (session as any)?.backendToken
}
