// @/src/app/login/page.tsx
"use client"

// Imports
import ThemeDropdown from "@/components/ThemeDropdown"
import { useActionState, useState } from "react";
import { EyeIcon, EyeSlashIcon, ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import Link from "next/link";
import { login } from "../actions/auth";

export default function Page() {
    const [showPassword, setShowPassword] = useState(false); // State to show password visibility
    const [state, action, pending] = useActionState(login, undefined)

    return (
        <div className="min-h-screen flex flex-1 flex-col items-center justify-items-center bg-backgroundSecondary text-textPrimary p-8 pb-20 sm:p-20">
            {/* Theme Selector */}
            <div className="flex self-end pb-8">
                <ThemeDropdown />
            </div>
            
            {/* This will be the login form */}
            <form action={action} className="flex flex-col gap-6 items-center justify-center p-10 bg-backgroundPrimary rounded-md min-w-[270px] md:rounded-[20px] md:min-w-[600px]">

                {/* Title */}
                <p className="font-semibold text-3xl pb-2">Login</p>
                <hr className="flex flex-1 w-full border-textPrimary rounded-full" />

                {/* This will be the Email Field */}
                <div className="flex flex-1 flex-col w-full gap-1">
                    <p className="font-medium">Email</p>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        autoComplete="true"
                        required
                        className="bg-backgroundSecondary p-2 rounded-[10px]"
                    />
                    {state?.errors?.email && <p className="flex flex-1 self-start text-warning">{state.errors.email}</p>}
                </div>

                {/* This will be the Password Field */}
                <div className="flex flex-1 flex-col w-full gap-1">
                    <p className="font-medium">Password</p>
                    <div className="flex bg-backgroundSecondary p-2 rounded-[10px]">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            autoComplete="true"
                            required
                            className="flex flex-1 bg-backgroundSecondary"
                        />

                        {/* Password Visibility Toggle */}
                        {showPassword? 
                            <EyeIcon 
                                width={24}
                                height={24}
                                onClick={() => setShowPassword((prev) => !prev)
                            }/> 
                            : 
                            <EyeSlashIcon 
                                width={24}
                                height={24}
                                onClick={() => setShowPassword((prev) => !prev)
                            }/>
                        }

                    </div>
                    {/* Password Errors */}
                    {state?.errors?.password && (
                        <div className="text-warning">
                        <p>Password must:</p>
                        <ul>
                            {state.errors.password.map((error) => (
                            <li key={error}>- {error}</li>
                            ))}
                        </ul>
                        </div>
                    )}
                </div>
                {state?.message && (
                    <p className="text-warning">{state.message}</p>
                )}

                {/* This will be the login button */}
                <motion.button
                    type="submit"
                    disabled={pending}
                    className="self-center bg-button rounded-full my-6"
                    whileHover={{ scale: 1.1 }}
                >
                    <ArrowRightEndOnRectangleIcon width={32} height={32} className="text-backgroundPrimary m-2"/>
                </motion.button>
                
                {/* Link to Register Page */}
                <div className="flex flex-1 flex-row">
                    <p className="text-textSecondary">Don&apos;t have an account? Sign up <Link href="register" className="text-link hover:cursor-pointer hover:underline">here</Link></p>
                </div>

            </form>

        </div>
    )
}