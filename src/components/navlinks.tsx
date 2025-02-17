// @/src/test/navlinks.tsx
"use client"

// Imports
import { motion } from "framer-motion";
import { HomeIcon, StarIcon, CheckIcon } from "@heroicons/react/24/outline";

export default function NavLinks() {
    return (
        <div className="flex flex-1 flex-row justify-center md:justify-start md:flex-col md:items-start">
            <motion.button className="flex flex-row md:py-2 items-center" whileHover={{ scale: 1.1 }}>
                <HomeIcon width={32} height={32} />
                <p className="hidden md:flex md:px-2">All Tasks</p>
            </motion.button>
            <motion.button className="flex flex-row md:py-2 items-center" whileHover={{ scale: 1.1 }}>
                <StarIcon width={32} height={32} />
                <p className="hidden md:flex md:px-2">Important</p>
            </motion.button>
            <motion.button className="flex flex-row md:py-2 items-center" whileHover={{ scale: 1.1 }}>
                <CheckIcon width={32} height={32} />
                <p className="hidden md:flex md:px-2">Completed</p>
            </motion.button>
        </div>
    )
}