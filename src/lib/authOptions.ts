import bcrypt from "bcrypt"
import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prismaClient from "@/lib/prismaClient"
import type { TUser } from "@/lib/types"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prismaClient),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials, email or password is missing")
        }

        const user: TUser | null = await prismaClient.user.findUnique({
          where: { email: credentials.email },
        })

        const userHashPassword = user?.hashPassword

        if (!user || !userHashPassword) {
          throw new Error("Invalid credentials, user not found")
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          userHashPassword
        )

        if (!isCorrectPassword) {
          throw new Error("Invalid credentials, password is incorrect")
        }

        return user
      },
    }),
  ],
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
}
