import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export const POST = auth(async function POST(req) {
  if (!req.auth) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
  }

  const data = await req.json()
  const { title, artist, url } = data

  try {
    const song = await prisma.song.create({
      data: {
        title,
        artist,
        url,
        user: {
          connect: { email: req.auth.user?.email ?? "" },
        }
      }
    })

    return NextResponse.json(song)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: "Error creating song" }, { status: 500 })
  }
})
