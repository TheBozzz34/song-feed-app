import { signIn } from "@/auth";

export function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google", { redirectTo: "/submit" });
      }}
    >
      <button
        type="submit"
        className="flex items-center gap-2 px-4 py-2 bg-white text-gray-800 border border-gray-300 rounded-md shadow hover:bg-gray-100 transition-colors"
      >
        <svg
          className="w-5 h-5"
          viewBox="0 0 488 512"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M488 261.8c0-17.8-1.6-35-4.6-51.7H249v97.9h134.3c-5.8 31-23.5 57.3-50.2 75v62.1h81.1c47.5-43.8 74.8-108.3 74.8-183.3zM249 492c67.1 0 123.4-22.2 164.5-60.4l-81.1-62.1c-22.6 15.2-51.5 24.3-83.4 24.3-64.1 0-118.3-43.2-137.7-101.2H28.2v63.5C69.7 433.4 152.1 492 249 492zM111.3 297.6c-5.1-15.2-8-31.4-8-48s2.9-32.8 8-48V138.1H28.2C10.1 174.2 0 213.4 0 256s10.1 81.8 28.2 117.9l83.1-63.5zm137.7-210.2c35.9 0 68.1 12.4 93.5 36.9l70.2-70.2C369.6 21.3 311.3 0 249 0 152.1 0 69.7 58.6 28.2 138.1l83.1 63.5c19.4-58 73.6-101.2 137.7-101.2z" />
        </svg>
        Sign in with Google
      </button>
    </form>
  );
}
