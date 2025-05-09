import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { spotify } from "@/lib/spotify"
import { NextResponse } from "next/server"


export const POST = auth(async function POST(req) {
  if (!req.auth) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
  }

  const data = await req.json()
  const { trackId } = data

  if (!trackId) {
    return NextResponse.json({ message: "Missing track ID" }, { status: 400 })
  }

  try {
    const spotifyTrack = await spotify.tracks.get(trackId);

    const title = spotifyTrack?.name ?? "Unknown Title"
    const artist = spotifyTrack?.artists.map((a: { name: string }) => a.name).join(", ") ?? "Unknown Artist"
    const url = `https://open.spotify.com/track/${trackId}`
    const coverArt = spotifyTrack?.album?.images?.[0]?.url || ''

    const song = await prisma.song.create({
      data: {
        title,
        artist,
        url,
        coverArt,
        user: {
          connect: { email: req.auth.user?.email ?? "" },
        }
      }
    })

    return NextResponse.json(song)
  } catch (error) {
    console.error("Error handling POST request:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
})
