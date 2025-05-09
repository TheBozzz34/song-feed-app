import { User } from "@/app/types/user";

type UserProfileProps = {
  user: User;
};

export function UserProfile({ user }: UserProfileProps) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold">{user.name || user.email}</h2>
      <p className="text-gray-400">
        Joined on: {new Date(user.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
}