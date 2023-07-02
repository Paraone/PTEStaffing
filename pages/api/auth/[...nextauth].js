import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { findStaff, authStaff } from "controllers/staffController";
import { authContentProvider, findContentProvider } from "controllers/contentProvidersController";

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
            const staff = await findStaff({ email });
            const contentProvider = await findContentProvider({ email });
            if (!staff) {
              if (!contentProvider) return null;

              const  { password: passwordHash } = contentProvider;
              const match = await authContentProvider(password, passwordHash);

              if (!match) return null;

              return contentProvider;
            }

            const { password: passwordHash } = staff;
            const match = await authStaff(password, passwordHash);

            if (!match) return null;

            return staff;
          // You need to provide your own logic here that takes the credentials
          // submitted and returns either a object representing a user or value
          // that is false/null if the credentials are invalid.
          // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
          // You can also use the `req` object to obtain additional parameters
          // (i.e., the request IP address)
          // Return null if user data could not be retrieved
        }
    })
    // ...add more providers here
  ],
  callbacks: {
    session: async ({ session }) => {
        if (!session) return;
        const email = session?.user?.email;
        const staff = await findStaff({ email });
        const contentProvider = await findContentProvider({ email})
        if (!staff) {
          if (!contentProvider) return;

          return {
            session: {
              user: {
                userId: contentProvider.userId,
                lastName: contentProvider?.legalName,
                username: contentProvider.username,
                email,
                emailConfirmed: contentProvider.emailConfirmed,
                accountType: contentProvider.accountType
              }
            }
          }
        }

        return {
          session: {
            user: {
              userId: staff.userId,
              firstname: staff.firstName,
              lastname: staff?.lastName,
              profileId: staff.profileId,
              email,
              emailConfirmed: staff.emailConfirmed,
              accountType: staff.accountType
            }
          }
        };
      }
  },
  pages: {
    signIn: '/login'
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
  secret: process.env.NEXT_PUBLIC_SECRET, // eslint-disable-line
}
export default NextAuth(authOptions)