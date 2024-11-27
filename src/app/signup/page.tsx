'use client'

import { motion } from "motion/react"
import Image from "next/image"

import login from "../../../public/login.svg"


export default function SignUp() {
  return (  
  <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen">

    <div className="flex flex-col gap-6 row-start-2 items-center sm:items-start bg-backgroundTwo p-10 rounded-[20px] md:min-w-[600px]">

      {/* Form Title */}
      <p className="self-center font-semibold text-[32px]">Sign Up</p>
      <hr className="flex flex-1 w-full border-foreground rounded-full" />


      {/* This will be the Username Field */}
      <div className="flex flex-1 flex-col w-full gap-1">
        <p className="font-medium">Username</p>
        <input type="text" id="username" autoComplete="true" className="bg-background p-2 rounded-[10px]"/>
      </div>
      

      {/* This will be the Password Field */}
      <div className="flex flex-1 flex-col w-full gap-1">
        <p className="font-medium">Password</p>
        <input type="password" id="password" autoComplete="true" required className="bg-background p-2 rounded-[10px]"/>
      </div>

      {/* This will be the Confirm Password Field */}
      <div className="flex flex-1 flex-col w-full gap-1">
        <p className="font-medium">Confirm Password</p>
        <input type="password" id="password" autoComplete="true" className="bg-background p-2 rounded-[10px]"/>
      </div>

      {/* This will be the login button */}
      <motion.button
        className="self-center bg-lime rounded-full my-6"
        whileHover={{ scale: 1.1 }}
      >
        <Image
          src={login}
          width="32"
          height="32"
          alt="Login Button"
          className="m-2.5"
        />
      </motion.button>

      <p className="self-center text-foregroundTwo">
        Have an account? Log in <a href="/login" className="text-blue underline">here</a>
      </p>

    </div>
  </div>
  )
}
