import Image from "next/image"
import login from "../../../public/login.svg"

import { signUpWithEmail } from "@/lib/server/appwrite"

export default async function SignUp() {

  return (  
  <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen">

    <form action={signUpWithEmail} className="flex flex-col gap-6 row-start-2 items-center sm:items-start bg-backgroundTwo p-10 rounded-[20px] md:min-w-[600px]">

      {/* Form Title */}
      <p className="self-center font-semibold text-[32px]">Sign Up</p>
      <hr className="flex flex-1 w-full border-foreground rounded-full" />

      
      {/* This will be the Username Field */}
      <div className="flex flex-1 flex-col w-full gap-1">
        <p className="font-medium">Username</p>
        <input id="username" name="username" type="username" className="bg-background p-2 rounded-[10px]"/>
      </div>

      {/* This will be the Email Field */}
      <div className="flex flex-1 flex-col w-full gap-1">
        <p className="font-medium">Email</p>
        <input id="email" name="email" type="email" autoComplete="true" className="bg-background p-2 rounded-[10px]"/>
      </div>
      

      {/* This will be the Password Field */}
      <div className="flex flex-1 flex-col w-full gap-1">
        <p className="font-medium">Password</p>
        <input id="password" name="password" minLength={8} type="password" autoComplete="true" required className="bg-background p-2 rounded-[10px]"/>
      </div>

      {/* This will be the Confirm Password Field */}
      <div className="flex flex-1 flex-col w-full gap-1">
        <p className="font-medium">Confirm Password</p>
        <input id="confirmPass" name="confirmPass" type="password" className="bg-background p-2 rounded-[10px]"/>
      </div>

      {/* This will be the login button */}
      <button
        type="submit"
        className="self-center bg-lime rounded-full my-6"
      >
        <Image
          src={login}
          width="32"
          height="32"
          alt="Login Button"
          className="m-2.5"
        />
      </button>

      <p className="self-center text-foregroundTwo">
        Have an account? Log in <a href="/login" className="text-blue underline">here</a>
      </p>

    </form>
  </div>
  )
}
