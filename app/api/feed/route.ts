import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export const GET = async () => {
  const startOfDay = new Date()
  startOfDay.setHours(0, 0, 0, 0)

  try {
    const songs = await prisma.song.findMany({
      where: {
        createdAt: {
          gte: startOfDay
        }
      },
      orderBy: {
        createdAt: "desc"
      },
      include: {
        user: true
      }
    })

    return NextResponse.json(songs)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: "Failed to fetch songs" }, { status: 500 })
  }
}
