// mark as client component
"use client";

// importing necessary functions
import { useSession, signIn, signOut } from "next-auth/react"
import Image from "next/image";
import Navbars from "./components/ืnavber";
import Dashboard from "./components/dashboard";

export default function Home() {
  const { data: session } = useSession()
  if (session) {
    console.log(session)
    return (
      <div className="">
          <Dashboard/>
        
      </div>
    )
  }
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
        <p className="text-2xl mb-2">Sign in</p>
        <button className="bg-none border-gray-300 border py-2 px-6 rounded-md mb-2" onClick={() => signIn('github')}>Sign in with github</button>
    </div>
  )

}
