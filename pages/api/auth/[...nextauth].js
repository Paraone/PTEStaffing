import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from 'next-auth/providers/google';
import { findstaff, authstaff } from "controllers/staffController";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
        name: 'email',
        credentials: {
          email: { label: "Email", type: "email", placeholder: "email" },
          password: {  label: "Password", type: "password", placeholder: 'password' }
        },
        async authorize(credentials) {
            const { email, password } = credentials;
            const staff = await findstaff({ email });
            if (!staff) return null

            const { password: passwordHash } = staff;
            const match = await authstaff(password, passwordHash);

            if (!match) {
                return null
            }

            return staff;
          // You need to provide your own logic here that takes the credentials
          // submitted and returns either a object representing a user or value
          // that is false/null if the credentials are invalid.
          // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
          // You can also use the `req` object to obtain additional parameters
          // (i.e., the request IP address)
          // Return null if user data could not be retrieved
        }
    }),
    GoogleProvider({
        clientId: process.env.GOOGLE_SIGN_IN_CLIENT_ID, // eslint-disable-line
        clientSecret: process.env.GOOGLE_SIGN_IN_SECRET // eslint-disable-line
    }),
    // ...add more providers here
  ],
  callbacks: {
    session: async ({ session }) => {
        if (!session) return;
        
        const staff = await findstaff({ email: session?.user?.email });
        if (!staff) return;

        return {
          session: {
            user: {
              userId: staff.userId,
              firstname: staff.firstName,
              lastname: staff.lastName,
              profileId: staff.profileId,
              email: staff.email,
              emailConfirmed: staff.emailConfirmed
            }
          }
        };
      },
      async signIn({ account, profile }) {
        if (account.provider === "google") {
          return profile.email_verified
        }
        return true // Do different verification for other providers that don't have `email_verified`
      },
  },
  pages: {
  },
  theme: {
    colorScheme: "light", // "auto" | "dark" | "light"
    brandColor: "", // Hex color value
    logo: "" // Absolute URL to logo image
  },
  jwt: {
    secret: process.env.JWT_SECRET, // eslint-disable-line
    maxAge: 60 * 60 * 24 * 30
  },
  secret: process.env.NEXT_PUBLIC_SECRET // eslint-disable-line
}
export default NextAuth(authOptions)