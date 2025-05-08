import { auth } from "@/auth"
import { SignOut } from "../components/signout-button"
import { SignIn } from "../components/signin-button"
 
export default async function Page() {
  const session = await auth()
  if (!session) return (
    <div>
        Not authenticated
        <SignIn />
        </div>
  )
 
  return (
    <div>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <SignOut />
    </div>
  )
}