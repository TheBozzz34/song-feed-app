'use client'

import { useEffect, useState } from 'react'

type Song = {
  id: string
  title: string
  artist: string
  url: string
  createdAt: string
  user: {
    name: string | null
    email: string
  }
}

export default function FeedPage() {
  const [songs, setSongs] = useState<Song[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSongs = async () => {
      const res = await fetch('/api/feed')
      const data = await res.json()
      setSongs(data)
      setLoading(false)
    }

    fetchSongs()
  }, [])

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Today&apos;s Songs</h1>

      {loading && <p>Loading...</p>}

      {!loading && songs.length === 0 && <p>No songs submitted today.</p>}

      <ul className="space-y-4">
        {songs.map((song) => (
          <li key={song.id} className="p-4 border border-gray-700 rounded-lg bg-gray-900">
            <h2 className="text-xl font-semibold">{song.title}</h2>
            <p className="text-gray-400">by {song.artist}</p>
            <a href={song.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">
              Listen
            </a>
            <p className="text-xs text-gray-500 mt-2">Submitted by {song.user.name ?? song.user.email}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
