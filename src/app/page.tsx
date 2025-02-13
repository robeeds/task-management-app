// @/src/app/page.tsx
"use client"

// Imports
import { motion } from "framer-motion";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import ThemeDropdown from "./components/ThemeDropdown";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-1 flex-col items-center justify-items-center font-[family-name:var(--font-fira-code)] bg-backgroundPrimary text-textPrimary font-bold p-8 pb-20 sm:p-20">

      {/* Testing Color Switch*/}
      <div className="flex self-end">
        <ThemeDropdown />
      </div>

      {/* Center container */}
      <div className="flex flex-1 flex-col items-center justify-center">

        {/* Title */}
        <p className="flex text-center pb-4">Taskman | A Task Management App</p>

        {/* Button */}
        <motion.button 
          className="flex flex-row items-center text-backgroundPrimary px-4 py-2 bg-button rounded-full" 
          whileHover={{ scale: 1.1 }}
        >
          <p className="pr-4">Login</p>
          <ArrowRightIcon width={18} height={18} strokeWidth={3}/>
        </motion.button>
        
      </div>


    </div>
  );
}
