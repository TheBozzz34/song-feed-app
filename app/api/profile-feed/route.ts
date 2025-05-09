import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export const GET = auth(async (req) => {
  if (!req.auth) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: req.auth.user?.email ?? "" },
    })

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    const songs = await prisma.song.findMany({
      where: { userId: user.id},
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(songs)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: "Failed to fetch profile feed" }, { status: 500 })
  }
})
