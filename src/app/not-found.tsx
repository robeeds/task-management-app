'use client'

import { motion } from "framer-motion"

export default function NotFound() {
    return (
      <div className="flex flex-1 flex-col h-full items-center justify-center align-middle gap-2">
        <h2>Sorry! We couldn&apos;t find that page</h2>
        <motion.a 
            className="bg-lime text-backgroundTwo px-3 py-2 rounded-full"
            href="/"
            whileHover={{ scale: 1.1 }}
        >
            Return Home
        </motion.a>
      </div>
    )
}