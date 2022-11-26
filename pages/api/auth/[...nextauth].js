import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from 'next-auth/providers/google';
import { findWorker, authWorker } from "controllers/usersController";

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
            const worker = await findWorker(email);
            if (!worker) return null

            const { password: passwordHash } = worker;
            const match = await authWorker(password, passwordHash);

            if (!match) {
                return null
            }

            return worker;
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
        clientId: process.env.GOOGLE_SIGN_IN_CLIENT_ID,
        clientSecret: process.env.GOOGLE_SIGN_IN_SECRET
    }),
    // ...add more providers here
  ],
  callbacks: {
    session: async ({ session }) => {
        if (!session) return;
        
        const worker = await findWorker(session?.user?.email);
        if (!worker) return;
        console.log({ worker })
        return {
          session: {
            user: {
              id: worker.userId,
              firstname: worker.firstName,
              lastname: worker.lastName,
              profileId: worker.profileId,
              email: worker.email,
              emailConfirmed: worker.emailConfirmed
            }
          }
        };
      },
  },
  secret: process.env.NEXT_PUBLIC_SECRET // eslint-disable-line
}
export default NextAuth(authOptions)