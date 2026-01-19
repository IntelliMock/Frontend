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

                if (!response.ok) {
                    console.error('Backend OAuth error:', await response.text());
                    return false;
                }

                const data = await response.json();

                // Store backend token in user object (will be added to JWT)
                (user as any).backendToken = data.token;
                (user as any).role = data.user.role;

                return true;
            } catch (error) {
                console.error('OAuth sign-in error:', error);
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
