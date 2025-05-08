import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/lib/prisma"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
        })
    ],
    callbacks: {
        async signIn({ user }) {
          // Check if user exists in your database
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email! }
          })
    
          if (!existingUser) {
            await prisma.user.create({
              data: {
                email: user.email!,
                name: user.name ?? null
              }
            })
          }
    
          return true // allow sign-in
        },
      },
})