// Client Page Component (app/profile/[slug]/page.tsx)
"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { ErrorMessage } from "@/app/components/ErrorMessage"; // Create this custom component
import { UserProfile } from "@/app/components/UserProfile"; // Create this custom component
import { Spinner } from "@/app/components/Spinner"; // Create this custom component

// Move types to a separate file for reusability
import { User } from "@/app/types/user";

export default function ProfilePage() {
  const { slug } = useParams() as { slug: string };
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/user/${slug}`);
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Error fetching user profile");
        }
        
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error("Profile fetch error:", err);
        setError(err instanceof Error ? err.message : "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchUser();
    }
  }, [slug]);

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      
      {loading && <Spinner />}
      
      {error && <ErrorMessage message={error} />}
      
      {!loading && !error && user ? (
        <UserProfile user={user} />
      ) : (
        !loading && !error && <p className="text-red-400">User not found</p>
      )}
    </div>
  );
}