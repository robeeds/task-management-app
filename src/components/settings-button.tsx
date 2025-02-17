// @/src/test/settings-button.tsx
"use client"

// Imports
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

export default function SettingsButton() {
    return (
        <div className="flex">
            <motion.button whileHover={{ scale: 1.1 }}>
                <Cog6ToothIcon width={32} height={32} />
            </motion.button>
        </div>
    )
}