'use client'

import { useState } from 'react'

export default function SubmitSongForm() {
  const [title, setTitle] = useState('')
  const [artist, setArtist] = useState('')
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    const res = await fetch('/api/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, artist, url }),
    })

    const result = await res.json()
    if (res.ok) {
      setMessage('Song submitted successfully!')
      setTitle('')
      setArtist('')
      setUrl('')
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
        placeholder="Song Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="w-full p-2 bg-gray-800 rounded border border-gray-600 focus:outline-none"
      />

      <input
        type="text"
        placeholder="Artist"
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
        required
        className="w-full p-2 bg-gray-800 rounded border border-gray-600 focus:outline-none"
      />

      <input
        type="url"
        placeholder="URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
        className="w-full p-2 bg-gray-800 rounded border border-gray-600 focus:outline-none"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 p-2 rounded"
      >
        {loading ? 'Submitting...' : 'Submit'}
      </button>

      {message && <p className="text-sm text-center mt-2">{message}</p>}
    </form>
  )
}
