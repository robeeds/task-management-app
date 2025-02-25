// @/src/test/task-card.tsx
"use client"

// Imports
import { TaskSchema } from "@/lib/definitions"
import { useState } from "react"
import CreateButton from "./create-button"

export default function TaskCard({ initialTasks }: {initialTasks: TaskSchema[]}) {
    const [tasks, setTasks] = useState<TaskSchema[]>(initialTasks)
    return(
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-4">

            {/* Create Button */}
            <div className="bg-backgroundPrimary rounded-[15px] hover:cursor-pointer">
                    <CreateButton />
                </div>

            {/* Task Cards */}
            {tasks.map((task) => (
                <div key={task.$id} id={task.$id} className="flex flex-1 flex-col col-span-1 h-[330px] bg-backgroundPrimary rounded-[15px] p-4">
                    <p>{task.title}</p>
                    <p>{task.description}</p>
                </div>
            ))}
        </div>
    )
}