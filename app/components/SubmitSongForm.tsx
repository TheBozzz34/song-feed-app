'use client'

import { useState } from 'react'

export default function SubmitSongForm() {
  const [trackInput, setTrackInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const extractTrackId = (input: string) => {
    const match = input.match(/(?:track\/|spotify:track:)([a-zA-Z0-9]{22})/)
    return match ? match[1] : input.trim()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    const trackId = extractTrackId(trackInput)

    if (!trackId || trackId.length !== 22) {
      setMessage('Invalid Spotify track ID or URL')
      setLoading(false)
      return
    }

    const res = await fetch('/api/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ trackId }),
    })

    const result = await res.json()
    if (res.ok) {
      setMessage('Song submitted successfully!')
      setTrackInput('')
    } else {
      setMessage(result.message || 'Something went wrong')
    }

    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 p-4 bg-gray-900 text-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold">Submit a Song</h2>

      <input
        type="text"
        placeholder="Spotify Track ID or URL"
        value={trackInput}
        onChange={(e) => setTrackInput(e.target.value)}
        required
        className="w-full p-2 bg-gray-800 rounded border border-gray-600 focus:outline-none"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 p-2 rounded"
      >
        {loading ? 'Submitting...' : 'Submit'}
      </button>

      {message && <p className="text-sm text-center mt-2">{message}</p>}
    </form>
  )
}
