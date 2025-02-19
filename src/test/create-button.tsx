// @/src/test/createButton.tsx
"use client"

// Imports
import { motion } from "framer-motion"
import { DocumentPlusIcon } from "@heroicons/react/24/outline"

export default function CreateButton() {
    return ( 
        <a href="/dashboard/create" className="bg-backgroundPrimary rounded-[15px]">
            <motion.div className="flex flex-1 flex-row col-span-1 h-[330px] items-center justify-center" whileHover={{ scale: 1.1 }}>
                <DocumentPlusIcon width={32} height={32}/>
                <p className="px-2">New Task</p>
            </motion.div>
        </a>
    )
}