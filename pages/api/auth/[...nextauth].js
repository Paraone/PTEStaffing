import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_SIGN_IN_CLIENT_ID, // eslint-disable-line
      clientSecret: process.env.GOOGLE_SIGN_IN_SECRET, // eslint-disable-line
    }),
    // ...add more providers here
  ],
}
export default NextAuth(authOptions)