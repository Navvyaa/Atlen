import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { JWT, Session } from "next-auth";
import { NextAuthOptions } from "next-auth";

// Define the token type
interface CustomToken extends JWT {
  accessToken?: string;
}

interface CustomSession extends Session {
  accessToken?: string;
}

// Define the authOptions type explicitly to conform with NextAuthOptions
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_AUTH_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_AUTH_GOOGLE_CLIENT_ID_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, account }: { token: CustomToken; account?: any }) {
      if (account) {
        token.accessToken = account.access_token; // Save Google access token
      }
      return token;
    },
    async session({ session, token }: { session: CustomSession; token: CustomToken }) {
      session.accessToken = token.accessToken; // Add token to session
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
