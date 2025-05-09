"use client";
import { useEffect, useState } from "react";
import { Play } from 'lucide-react'

type Song = {
  id: string;
  title: string;
  artist: string;
  url: string;
  coverArt: string;
  createdAt: string;
  slug: string;
  user: {
    name: string | null;
    email: string;
  };
};

export default function FeedPage() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSongs = async () => {
      const res = await fetch("/api/feed");
      const data = await res.json();
      setSongs(data);
      setLoading(false);
    };
    fetchSongs();
  }, []);

  return (
    <div className="min-h-screen bg-[url(/sunset.jpg)] bg-cover bg-center text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Today&apos;s Songs</h1>
      {loading && <p>Loading...</p>}
      {!loading && songs.length === 0 && <p>No songs submitted today.</p>}
      <ul className="space-y-4">
        {songs.map((song) => (
          <li
            key={song.id}
            className="w-full bg-gray-800 p-4 rounded-lg shadow-md flex items-center"
          >
            <img
              src={song.coverArt}
              alt={song.title}
              className="w-16 h-16 rounded-md shadow-lg mr-4"
            />
            <div className="flex-1">
              <h2 className="text-xl font-semibold">{song.title}</h2>
              <p>by {song.artist}</p>
              <p className="text-xs text-gray-400 mt-1">
                Submitted by <a href={`/profile/${song.user.slug}`} className="text-blue-400">{song.user.name || song.user.email}</a>
              </p>
            </div>
            <a
              href={song.url}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition h-full"
            >
              <span>Listen</span>
              <Play className="w-5 h-5" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}