// @/src/test/logout-button.tsx
"use client"

// Imports
import { logout } from "@/actions/auth"
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline"
import { motion } from "framer-motion"

export default function LogoutButton() {
    return(
        <motion.button onClick={logout} whileHover={{ scale: 1.1 }} className="flex flex-row items-center">
            <ArrowRightStartOnRectangleIcon width={32} height={32} />
            <p className="hidden md:flex md:px-2">Logout</p>
        </motion.button>
    )
}