import NextAuth from "next-auth";
import { getUserProfile, User } from "./data/user";
import authConfig from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    async jwt({ token, user }) {
      // If user is signing in, add the access token to the JWT

      console.log({ tokenUser: user });
      if (user) {
        console.log({ user });
        token.accessToken = (user as any).accessToken;
        token.user = (user as any).user;
        console.log({ token });
      }

      // Check if token is still valid by making a test request
      if (token.accessToken) {
        try {
          const response = await getUserProfile(token.accessToken as string);

          if (response) {
            // Update user data from the me endpoint
            const userData = response;
            token.user = {
              id: userData.client.id.toString(),
              email: userData.client.email,
              name: `${userData.client.first_name} ${userData.client.last_name}`,
              firstName: userData.client.first_name,
              lastName: userData.client.last_name,
              reference: userData.client.reference,
            };
          }
        } catch (error) {
          console.error("Token validation error:", error);

          if (error instanceof Error && error.cause instanceof Response) {
            if (error.cause.status === 401) {
              return null;
            }
          }

          throw error
        }
      }
      return token;
    },
    async session({ session, token }) {
      // Add the access token and user data to the session
      console.log("Session");
      console.log({ session });
      console.log({ sessionToken: token });
      if (token.accessToken) {
        (session as any).accessToken = token.accessToken;
        (session as any).user = token.user;
      }

      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  ...authConfig,
});

// Helper function to get the current user from session
export async function getCurrentUser(): Promise<User | null> {
  const session = await auth();

  if (!session?.accessToken) {
    return null;
  }

  try {
    const response = await getUserProfile((session as any).accessToken);
    return response.client;
  } catch (error) {
    console.error("Failed to get current user:", error);
    return null;
  }
}
