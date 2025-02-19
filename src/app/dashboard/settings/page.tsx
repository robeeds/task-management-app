// @/src/app/dashboard/settings/page.tsx
"use client"

// Imports
import ThemeDropdown from "@/components/ThemeDropdown";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function Page() {
    const router = useRouter(); // Will be used for back

    return (
        <div className="flex flex-1 bg-backgroundPrimary text-textPrimary justify-center rounded-b-[15px] md:rounded-bl-none md:rounded-r-[15px]">
            <div className="flex flex-1 flex-col justify-center max-w-[330px]">

                {/* Title */}
                <p className="self-center">Settings</p>

                {/* Divider */}
                <div className="flex w-full px-2 py-4">
                    <hr className="flex flex-1 w-full border-textPrimary rounded-full" />
                </div>

                {/* Theme */}
                <div className="flex flex-row items-center justify-between">
                    <p> Choose Theme: </p>
                    <ThemeDropdown />
                </div>

                {/* Back Button */}
                <div className="flex">
                    <motion.button whileHover={{ scale: 1.1 }} onClick={router.back} className="flex items-center">
                        <ArrowLeftIcon width={32} height={32} className="p-2"/>
                        <p>Back</p>
                    </motion.button>
                </div>
            </div>
        </div>
    )
}