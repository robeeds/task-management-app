"use client";

import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="grid items-center justify-items-center min-h-screen p-8">
      {/* This will be the main card */}
      <div className="flex flex-col items-center font-semibold">
        <p className="pb-4">Taskman | A Task Management App</p>
        <motion.a
          whileHover={{ scale: 1.1 }}
          className="flex flex-1 justify-between bg-lime py-2 px-4 rounded-full text-background"
          href="/login"
        >
          <p className="pr-4">Login</p>
          <p>{"->"}</p>
        </motion.a>
      </div>
    </div>
  );
}
