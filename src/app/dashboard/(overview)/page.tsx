// @/src/app/dashboard/page.tsx

// Imports
import { TaskSchema } from "@/lib/definitions";
import { getTasks } from "@/actions/tasks";
import TaskCard from "@/test/task-card";

export default async function Page() {

    const tasks: TaskSchema[] = await getTasks()

    return (
        <div className="relative flex flex-1 flex-col w-full">
            
            {/* Primary Section for Viewing Tasks */}
            <div className={`z-[4] p-4`}>
                {/* Title */}
                <p className="font-bold text-4xl pt-5 pl-2 self-center md:self-start"> All Tasks </p>

                {/* Divider */}
                <div className="flex w-full md:w-[10%] px-2 pt-9 pb-4">
                    <hr className="flex flex-1 w-full border-textPrimary rounded-full" />
                </div>

                {/* Task List */}
                {/* Use Realtime to retrieve and update task data */}
                <div className="">
                    
                    {/* <TaskCards {...data} /> */}
                    <TaskCard initialTasks={tasks} />
                </div>
                
            </div>

            {/* Overlay for editing a task */}
            
        </div>
    )
}