import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_AUTH_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_AUTH_GOOGLE_CLIENT_ID_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token; // Save Google access token
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken; // Add token to session
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
