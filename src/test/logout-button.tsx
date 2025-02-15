// @/src/test/logout-button.tsx
"use client"

// Imports
import { logout } from "@/app/actions/auth"
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline"
import { motion } from "framer-motion"

export default function LogoutButton() {
    return(
        <motion.button onClick={logout} whileHover={{ scale: 1.1 }} className="flex flex-row">
            <p className="">Logout</p>
            <ArrowLeftStartOnRectangleIcon width={32} height={32} />
        </motion.button>
    )
}