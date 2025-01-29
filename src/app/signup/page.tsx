"use client";

import Image from "next/image";
import login from "../../../public/login.svg";
import eye from "../../../public/eye.svg"
import eyeOff from "../../../public/eyeoff.svg"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";

export default function SignUpPage() {
  const [error, setError] = useState<string | null>(null); // State to hold the error message
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission
    setError(null); // Reset error message

    const formData = new FormData(event.currentTarget); // Gathers current form data

    // Checks if passwords match
    const password = formData.get("password");
    const confirmPass = formData.get("confirmPass");
    if (password !== confirmPass) {
      setError("Passwords do not match");
    } else {
      try {
        const res = await fetch("/api/signup", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();

        // If login is successful, redirect is handled by the API
        if (res.status == 200) {
          router.push("/dashboard");
        } else if (res.status == 409) {
          setError("A user already exists with that email")
        } else {
          setError(data.error);
        }
      } catch (err) {

        // Debugging
        console.log("/signup", err);

        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 row-start-2 items-center sm:items-start bg-backgroundTwo p-10 rounded-[20px] md:min-w-[600px]"
      >
        {/* Form Title */}
        <p className="self-center font-semibold text-[32px]">Sign Up</p>
        <hr className="flex flex-1 w-full border-foreground rounded-full" />

        {/* This will be the Name Field */}
        <div className="flex flex-1 flex-col w-full gap-1">
          <p className="font-medium">Name</p>
          <input
            id="username"
            name="username"
            type="username"
            placeholder="Firstname Lastname"
            required
            className="bg-background p-2 rounded-[10px]"
          />
        </div>

        {/* This will be the Email Field */}
        <div className="flex flex-1 flex-col w-full gap-1">
          <p className="font-medium">Email</p>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="example@email.com"
            autoComplete="true"
            required
            className="bg-background p-2 rounded-[10px]"
          />
        </div>

        {/* This will be the Password Field */}
        <div className="flex flex-1 flex-col w-full gap-1">
          <p className="font-medium">Password</p>
          <div className="flex bg-background p-2 rounded-[10px]">
          <input
            id="password"
            name="password"
            minLength={8}
            type={showPassword ? "text" : "password"}
            autoComplete="true"
            required
            className="flex flex-1 bg-background"
          />
          <Image 
            src={showPassword ? eye : eyeOff}
            alt="Password toggle"
            width={28}
            height={28}
            onClick={() => 
              setShowPassword((prev) => !prev)
            }
          />
          </div>
        </div>

        {/* This will be the Confirm Password Field */}
        <div className="flex flex-1 flex-col w-full gap-1">
          <p className="font-medium">Confirm Password</p>
          <div className="flex bg-background p-2 rounded-[10px]">
            <input
              id="confirmPass"
              name="confirmPass"
              type={showPassword ? "text" : "password"}
              required
              className="flex flex-1 bg-background"
            />
            <Image 
              src={showPassword ? eye : eyeOff}
              alt="Password toggle"
              width={28}
              height={28}
              onClick={() => 
                setShowPassword((prev) => !prev)
              }
            />
          </div>
        </div>

        {/* Error Message */}
        {error && <div className="text-red-500">{error}</div>}

        {/* This will be the login button */}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.1 }}
          className="self-center bg-lime rounded-full my-6"
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
          Have an account? Log in{" "}
          <a href="/login" className="text-blue underline">
            here
          </a>
        </p>
      </form>
    </div>
  );
}
