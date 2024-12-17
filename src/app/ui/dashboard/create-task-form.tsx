"use client";

import { motion } from "framer-motion";

export default function CreateTaskForm() {
    return (
        <div className="flex bg-backgroundTwo rounded-[15px]">
            <form className="flex flex-col gap-6 row-start-2 items-center sm:items-start bg-backgroundTwo p-10 rounded-[20px] md:min-w-[600px]">

                {/* Form Title */}
                <p className="self-center font-semibold text-[32px]">Create Task</p>
                
                {/* This is the Card's Divider */}
                <hr className="flex flex-1 w-full border-foreground rounded-full" />

                {/* This is the Task's Title */}
                <div className="flex flex-1 flex-col w-full gap-1">
                    <p className="font-medium">Title</p>
                    <input
                        id="title"
                        required
                        className="bg-background p-2 rounded-[10px] placeholder:text-gray-400"
                        placeholder="My Project"
                    />
                </div>

                {/* This is the Task's Description */}
                <div className="flex flex-1 flex-col w-full gap-1">
                    <p className="font-medium">Description</p>
                    <textarea
                        id="description"
                        required
                        className="bg-background p-2 rounded-[10px] placeholder:text-gray-400"
                        placeholder="Create a full-stack application using Appwrite, Next.js, and Tailwind."
                    />
                </div>

                {/* Due Date */}
                <div className="flex flex-1 flex-col w-full gap-1">
                    <p className="font-medium">Due Date</p>
                    <input 
                        id="date"
                        type="date"
                        className="bg-background p-2 rounded-[10px] text-gray-400"
                    />
                </div>

                {/* Important */}
                <div className="flex flex-1 flex-row w-full gap-1 justify-between">
                    <p className="font-medium">Important?</p>
                    <input
                        id="important"
                        type="checkbox"
                        className="mr-3 checked:accent-foreground"
                    />
                </div>

                {/* Submit Button */}
                <div className="self-center">
                    <motion.button 
                        //onSubmit
                        className="flex flex-1 bg-lime rounded-full"
                        whileHover={{ scale: 1.1 }}
                    >
                        <p className="text-background px-4 py-2">Save</p>
                    </motion.button>
                </div>

            </form>
        </div>
    )
}