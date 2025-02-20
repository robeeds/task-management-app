// @/src/test/create-form.tsx
"use client"

// Imports
import { motion } from "framer-motion"
import { useActionState, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { StarIcon as StarOff } from "@heroicons/react/24/outline";
import { StarIcon as StarOn } from "@heroicons/react/24/solid";
import { createTask } from "@/actions/tasks";

export default function CreateForm() {
    const router = useRouter(); // Used for back button
    const [important, setImportant] = useState(false); // State to toggle task importance
    const [state, action, pending] = useActionState(createTask, undefined)

    return(
        <form action={action} className="flex flex-col justify-center gap-6 p-4">
            
            {/* Form Title */}
            <p className="font-bold text-3xl pt-5 pl-2 self-center ">Create Task</p>

            {/* Divider */}
            <div className="flex w-full pt-9 pb-4">
                <hr className="flex flex-1 w-full border-textPrimary rounded-full" />
            </div>

            {/* Task Title */}
            <div className="flex flex-1 flex-col w-full gap-1">
                <p className="font-medium">Title</p>
                <input
                    id="title"
                    name="title"
                    required
                    className="bg-backgroundTertiary p-2 rounded-[10px] placeholder:text-textTertiary"
                    placeholder="My Project"
                    />
                {state?.errors.title && <p>{state.errors.title}</p>}
            </div>

            {/* Description */}
            <div className="flex flex-1 flex-col w-full gap-1">
                <p className="font-medium">Description</p>
                <textarea
                    id="description"
                    className="bg-backgroundTertiary p-2 rounded-[10px] placeholder:text-textTertiary md:min-h-[200px]"
                    placeholder="Create a full-stack application using Appwrite, Next.js, and Tailwind."
                />
                {state?.errors.description && <p>{state.errors.description}</p>}
            </div>

            {/* Due Date */}
            <div className="flex flex-1 flex-col w-full gap-1">
                <p className="font-medium">Due Date</p>
                <input 
                    id="dueDate"
                    name="dueDate"
                    type="date"
                    className="text-textTertiary bg-backgroundTertiary p-2 rounded-[10px]"
                />
                {state?.errors.dueDate && <p>{state.errors.dueDate}</p>}
            </div>

            {/* isImportant Toggle */}
            <div className="flex flex-1 flex-row w-full gap-1 justify-between items-center">
                <p className="font-medium">Important?</p>
                <div>
                    <input id="isImportant" name="isImportant" type="checkbox" className="hidden" onChange={() => setImportant((prev) => !prev)}/>
                    <label htmlFor="isImportant" >
                        {important ? 
                            <StarOn width={28} height={28}  />
                            : 
                            <StarOff width={28} height={28} />
                        }
                    </label>
                </div>
            </div>

            {/* Back and Submit Buttons */}
            <div className="flex flex-1 flex-row justify-evenly items-center">
                {/* Back Button */}
                <motion.div className="flex items-center hover:cursor-pointer" whileHover={{ scale: 1.1 }} onClick={router.back}>
                        <ArrowLeftIcon width={28} height={28} />
                        <p className="p-2">Back</p>
                </motion.div>

                {/* Submit Button */}
                <div className="flex">
                    <motion.button 
                        type="submit"
                        disabled={pending}
                        className="flex flex-1 bg-button rounded-full"
                        whileHover={{ scale: 1.1 }}
                    >
                        <p className="font-semibold text-backgroundTertiary px-4 py-2">Save</p>
                    </motion.button>
                </div>            
            </div>
        </form>
    )
}