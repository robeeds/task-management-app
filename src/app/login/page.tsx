'use client'

import Image from "next/image"
import login from "../../../public/login.svg"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function LoginPage() {
  const [ error, setError ] = useState<string | null>(null); // State to hold the error message
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission
    setError(null); // Reset error message

    const formData = new FormData(event.currentTarget); // Gathers current form data

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      console.log(data);

      // If login is successful, redirect is handled by the API
      if (res.status == 200) {
        router.push('/dashboard');
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };  

  return (  
  <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen">

    <form onSubmit={handleSubmit}
     className="flex flex-col gap-6 row-start-2 items-center sm:items-start bg-backgroundTwo p-10 rounded-[20px] md:min-w-[600px]">

      {/* Form Title */}
      <p className="self-center font-semibold text-[32px]">Login</p>
      <hr className="flex flex-1 w-full border-foreground rounded-full" />


      {/* This will be the Username Field */}
      <div className="flex flex-1 flex-col w-full gap-1">
        <p className="font-medium">Email</p>
        <input type="email" id="email" name="email" autoComplete="true" required className="bg-background p-2 rounded-[10px]"/>
      </div>
      
      {/* This will be the Password Field */}
      <div className="flex flex-1 flex-col w-full gap-1">
        <p className="font-medium">Password</p>
        <input type="password" id="password" name="password" autoComplete="true" required className="bg-background p-2 rounded-[10px]"/>
      </div>

      {/* Error Message */}
      {error && (
        <div className="text-red-500">
          {error}
        </div>
      )}

      {/* This will be the login button */}
      <button
        type="submit"
        className="self-center bg-lime rounded-full my-6"
        //whileHover={{ scale: 1.1 }}
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
        Don't have an account? Sign up <a href="/signup" className="text-blue underline">here</a>
      </p>

    </form>
  </div>
  )
}
