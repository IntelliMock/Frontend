// API client for profile settings endpoints

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export interface UserProfile {
    id: string;
    email: string;
    name: string | null;
    displayName: string | null;
    bio: string | null;
    avatar: string | null;
    avatarOverride: string | null;
    provider: string | null;
    publicProfile: boolean;
    showOnLeaderboard: boolean;
    createdAt: string;
    lastLogin: string | null;
    accountStatus: string;
    linkedAccounts: LinkedAccount[];
    activeSessions: UserSession[];
}

export interface LinkedAccount {
    provider: string;
    email: string;
    connectedAt: string;
}

export interface UserSession {
    id: string;
    device: string;
    browser: string;
    location: string | null;
    lastActivity: string;
}

export interface UpdateProfileData {
    name?: string;
    displayName?: string;
    bio?: string;
    avatarOverride?: string;
}

export interface PrivacySettings {
    publicProfile: boolean;
    showOnLeaderboard: boolean;
}

export interface ConnectProviderData {
    provider: string;
    providerId: string;
    email: string;
}

// Helper to get backend token from NextAuth session
// This should be called from client components that have access to useSession
let cachedBackendToken: string | null = null;
let tokenResolvers: Array<(token: string) => void> = [];

export function setBackendToken(token: string | null) {
    cachedBackendToken = token;

    // Resolve all waiting promises
    if (token) {
        tokenResolvers.forEach(resolve => resolve(token));
        tokenResolvers = [];
    }
}

// Wait for token to be available (with timeout)
function waitForToken(timeoutMs: number = 5000): Promise<string> {
    if (cachedBackendToken) {
        return Promise.resolve(cachedBackendToken);
    }

    return new Promise((resolve, reject) => {
        // Set timeout
        const timeout = setTimeout(() => {
            reject(new Error('Token wait timeout - session not loaded'));
        }, timeoutMs);

        // Add resolver to queue
        tokenResolvers.push((token) => {
            clearTimeout(timeout);
            resolve(token);
        });
    });
}

async function fetchWithAuth(url: string, options: RequestInit = {}) {
    try {
        // Wait for token to be available
        const token = await waitForToken();

        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        };

        // Merge with any additional headers
        if (options.headers) {
            Object.assign(headers, options.headers);
        }

        const response = await fetch(url, {
            ...options,
            headers,
            credentials: 'include', // Include cookies in requests
        });

        if (!response.ok) {
            // Handle 401 Unauthorized - likely deleted account
            if (response.status === 401) {
                const error = await response.json().catch(() => ({ message: 'Unauthorized' }));

                // If account is deleted, sign out immediately
                if (error.message && error.message.includes('deleted')) {
                    // Dynamically import signOut to avoid circular dependencies
                    const { signOut } = await import('next-auth/react');
                    await signOut({ callbackUrl: '/', redirect: true });
                }

                throw new Error(error.message || 'Unauthorized');
            }

            const error = await response.json().catch(() => ({ message: 'Request failed' }));
            throw new Error(error.message || `HTTP ${response.status}`);
        }

        return response.json();
    } catch (error) {
        throw error;
    }
}

export async function getUserProfile(): Promise<UserProfile> {
    return fetchWithAuth(`${API_BASE_URL}/profile`);
}

export async function updateProfile(data: UpdateProfileData): Promise<UserProfile> {
    return fetchWithAuth(`${API_BASE_URL}/profile`, {
        method: 'PATCH',
        body: JSON.stringify(data),
    });
}

export async function updatePrivacySettings(settings: PrivacySettings): Promise<PrivacySettings> {
    return fetchWithAuth(`${API_BASE_URL}/profile/privacy`, {
        method: 'PATCH',
        body: JSON.stringify(settings),
    });
}

export async function connectOAuthProvider(data: ConnectProviderData): Promise<LinkedAccount> {
    return fetchWithAuth(`${API_BASE_URL}/profile/oauth/connect`, {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

export async function disconnectOAuthProvider(provider: string): Promise<{ message: string }> {
    return fetchWithAuth(`${API_BASE_URL}/profile/oauth/${provider}`, {
        method: 'DELETE',
    });
}

export async function getActiveSessions(): Promise<UserSession[]> {
    return fetchWithAuth(`${API_BASE_URL}/profile/sessions`);
}

export async function revokeAllSessions(): Promise<{ message: string }> {
    return fetchWithAuth(`${API_BASE_URL}/profile/sessions/revoke-all`, {
        method: 'POST',
    });
}

export async function exportUserData(): Promise<any> {
    return fetchWithAuth(`${API_BASE_URL}/profile/export`);
}

export async function deleteAccount(): Promise<{ message: string }> {
    return fetchWithAuth(`${API_BASE_URL}/profile/account`, {
        method: 'DELETE',
    });
}

export async function recoverAccount(): Promise<{ message: string }> {
    return fetchWithAuth(`${API_BASE_URL}/profile/recover`, {
        method: 'POST',
    });
}
