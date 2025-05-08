// app/signin/page.tsx


import { SignIn } from "../components/signin-button";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="p-6 rounded-lg shadow-md bg-gray-900 max-w-sm w-full">
        <h1 className="text-2xl font-semibold mb-4">Sign In</h1>
        <SignIn />
      </div>
    </div>
  );
}
