import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "./db";
import User from "@/model/User";
import bcrypt from "bcrypt"
// The Credentials provider allows you to handle signing in with arbitrary credentials, such as a username and password, two-factor authentication or hardware device (e.g. YubiKey U2F / FIDO).
export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) {
                    throw new Error("Missing email or password");
                }
                try {
                    await connectToDatabase()
                    const user = await User.findOne({ email: credentials.email })
                    if (!user) {
                        throw new Error("no user found")
                    }

                    const isValid = await bcrypt.compare(
                        credentials.password,
                        user.password
                    )
                    if (!isValid) {
                        throw new Error("Invalid password")
                    }

                    return { // we generally return an object here!
                        id: user._id.toString(),
                        email: user.email
                    }
                } catch (error) {
                    throw error
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
            }
            return token
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string // read about as string
            }
            return session
        }
    }, pages: {
        signIn: "/login",
        error: "/login"
    },
    session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 }, // because the strategy is JWT thats why the entire next-auth will work as JWT from the get go, we can also store session strategy in Database but then purely session will act as default. SESSION IS BY DEFAULT
    secret: process.env.NEXTAUTH_SECRET
}
