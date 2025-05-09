"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

type Song = {
  id: string;
  title: string;
  artist: string;
  url: string;
  createdAt: string;
};

export default function ProfileFeedPage() {
  const { data: session, status } = useSession();
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Only fetch if authenticated
    if (status === "authenticated") {
      const fetchSongs = async () => {
        try {
          const res = await fetch("/api/profile-feed");
          if (!res.ok) {
            const err = await res.json();
            setError(err.message || "Error fetching profile feed");
            setLoading(false);
            return;
          }
          const data = await res.json();
          setSongs(data);
        } catch (err) {
          setError("Failed to fetch songs");
        } finally {
          setLoading(false);
        }
      };
      
      fetchSongs();
    }
  }, [status]);

  // Show loading state if still authenticating
  if (status === "loading") {
    return <div className="min-h-screen bg-black text-white p-8">Loading session...</div>;
  }

  // Show message if not authenticated
  if (status !== "authenticated") {
    return (
      <div className="min-h-screen bg-black text-white p-8">
        <p>Please sign in to view your profile feed.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Your Songs</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && songs.length === 0 && (
        <p>You haven't submitted any songs yet.</p>
      )}
      <ul className="space-y-4">
        {songs.map((song) => (
          <li
            key={song.id}
            className="p-4 border border-gray-700 rounded-lg bg-gray-900"
          >
            <h2 className="text-xl font-semibold">{song.title}</h2>
            <p className="text-gray-400">by {song.artist}</p>
            <a
              href={song.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 underline"
            >
              Listen
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}