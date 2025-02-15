// @/src/app/signup/page.tsx
"use client"

// Imports
import ThemeDropdown from "@/components/ThemeDropdown"
import { useActionState, useState } from "react";
import Link from "next/link";
import { EyeIcon, EyeSlashIcon, ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { register } from "../actions/auth";

export default function Page() {
    const [showPassword, setShowPassword] = useState(false); // State to show password visibility
    const [state, action, pending] = useActionState(register, undefined)

    return (
        <div className="min-h-screen flex flex-1 flex-col items-center justify-items-center bg-backgroundSecondary text-textPrimary p-8 pb-20 sm:p-20">

            {/* Theme Selector */}
            <div className="flex self-end lg:absolute pb-8">
                <ThemeDropdown />
            </div>
            
            {/* This will be the signup form */}
            <form action={action} className="flex flex-col gap-6 items-center justify-center p-10 bg-backgroundPrimary rounded-md min-w-[270px] md:rounded-[20px] md:min-w-[600px]">

                {/* Title */}
                <p className="font-semibold text-3xl pb-2">Register</p>
                <hr className="flex flex-1 w-full border-textPrimary rounded-full" />

                {/* This will be the Name Field */}
                <div className="flex flex-1 flex-col w-full gap-1">
                    <label htmlFor="name" className="font-medium">Name</label>
                    <input
                        type="name"
                        id="name"
                        name="name"
                        autoComplete="true"
                        required
                        className="bg-backgroundSecondary p-2 rounded-[10px]"
                    />
                    {state?.errors?.name && <p className="flex flex-1 self-start text-warning">{state.errors.name}</p>}
                </div>
                

                {/* This will be the Email Field */}
                <div className="flex flex-1 flex-col w-full gap-1">
                    <label htmlFor="email" className="font-medium">Email</label>
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
                    <label htmlFor="password" className="font-medium">Password</label>
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
                </div>

                {/* This will be the Confirm Password Field */}
                <div className="flex flex-1 flex-col w-full gap-1">
                    <p className="font-medium">Confirm Password</p>
                    <div className="flex bg-backgroundSecondary p-2 rounded-[10px]">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="confirmPassword"
                            name="confirmPassword"
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
                        <div className="flex flex-1 flex-col self-start text-warning">
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
                    disabled={pending}
                    type="submit"
                    className="self-center bg-button rounded-full my-6"
                    whileHover={{ scale: 1.1 }}
                >
                    <ArrowRightEndOnRectangleIcon width={32} height={32} className="text-backgroundPrimary m-2"/>
                </motion.button>

                {/* Link to Login Page */}
                <div className="flex flex-1 flex-row">
                    <p className="text-textSecondary">Already have an account? Log in <Link href="login" className="text-link hover:cursor-pointer hover:underline">here</Link></p>
                </div>

            </form>

        </div>
    )
}