import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/lib/prisma"
import { slugGenerator } from "./lib/utils";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
    })
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google" && user?.email) {

        if (user.email != process.env.ADMIN_EMAIL) {
          // console.error("Invalid email domain:", user.email)
          return false // Reject sign-in for admin email
        }
        
        try {
          // Check if the user is already in the database
          const prismaUser = await prisma.user.findUnique({
            where: { email: user.email },
          })
          
          // If the user is not in the database, create a new user
          if (!prismaUser) {
            await prisma.user.create({
              data: {
                email: user.email,
                name: user.name || "",
                slug: slugGenerator(5),
              },
            })
          }
          return true
        } catch (error) {
          console.error("Database error during sign in:", error)
          // Still allow sign in even if database operation fails
          return true
        }
      }
      return false // Reject sign-in for non-Google accounts
    },
  },
})