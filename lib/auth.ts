import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        GitHub({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            try {
                console.log('=== OAuth Sign-In Attempt ===');
                console.log('Provider:', account?.provider);
                console.log('User Email:', user.email);
                console.log('Backend URL:', process.env.NEXT_PUBLIC_BACKEND_URL);

                // Send OAuth profile to NestJS backend
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/oauth`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        provider: account?.provider,
                        providerId: account?.providerAccountId,
                        email: user.email,
                        name: user.name,
                        avatar: user.image,
                    }),
                });

                console.log('Backend response status:', response.status);

                if (!response.ok) {
                    const errorText = await response.text();
                    console.error('Backend OAuth error:', errorText);
                    console.error('Response status:', response.status);
                    return false;
                }

                const data = await response.json();
                console.log('Backend response data:', data);

                // Store backend token in user object (will be added to JWT)
                (user as any).backendToken = data.token;
                (user as any).role = data.user.role;

                console.log('=== OAuth Sign-In Success ===');
                return true;
            } catch (error) {
                console.error('=== OAuth Sign-In Error ===');
                console.error('Error details:', error);
                console.error('Error message:', error instanceof Error ? error.message : 'Unknown error');
                return false;
            }
        },
        async jwt({ token, user, account }) {
            // Add backend token to JWT on sign-in
            if (user) {
                token.backendToken = (user as any).backendToken;
                token.role = (user as any).role;
            }
            return token;
        },
        async session({ session, token }) {
            // Add backend token and role to session
            if (token) {
                (session as any).backendToken = token.backendToken;
                (session.user as any).role = token.role;
            }
            return session;
        },
    },
    pages: {
        signIn: '/auth/login',
        error: '/auth/error',
    },
})
