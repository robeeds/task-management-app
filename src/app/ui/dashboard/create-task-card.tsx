"use client";

import { motion } from "framer-motion";

import Image from "next/image"
import newtask from "../../../../public/newtask.svg"

export default function NewTaskCard() {
    return (
        <div className="z-[5] bg-opacity-30">
            <div className="col-span-1 h-[330px] bg-backgroundTwo rounded-[15px]">
                <motion.a 
                    href="/dashboard/create" 
                    className="flex flex-1 h-full flex-row justify-center items-center"
                    whileHover={{ scale : 1.1 }}
                >
                    <Image 
                        src={newtask}
                        width={32}
                        height={32}
                        alt="New Task Icon"
                    />
                    <p className="text-foregroundTwo p-2">New Task</p>
                </motion.a>
            </div>
        </div>
    )
}