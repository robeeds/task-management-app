// @/src/test/task-card.tsx
"use client"

// Imports
import { TaskSchema } from "@/lib/definitions"
import client from "@/lib/appwrite"
import { useState, useEffect } from "react"
import CreateButton from "./create-button"

const DATABASE = '67a113c40021c7fe3479'
const COLLECTION = '67a113cc000fa69b928a'

export default function TaskCard({ initialTasks }: {initialTasks: TaskSchema[]}) {
    const [tasks, setTasks] = useState<TaskSchema[]>(initialTasks)

    useEffect(() => {
        const channel = (`databases.${DATABASE}.collections.${COLLECTION}.documents`);

        const unsubscribe = client.subscribe(channel, (response) => {
            console.log(response.events)
            const changedTask = response.payload as TaskSchema

            if(response.events.includes('databases.*.collections.*.documents.*.create')) {
                setTasks((prevTasks) => [changedTask, ...prevTasks])
            }

            if(response.events.includes('databases.*.collections.*.documents.*.delete')) {
                setTasks((prevTasks) => prevTasks.filter((task) => task.$id !== changedTask.$id))
            }

        })

        return() => unsubscribe()
    }, [])

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