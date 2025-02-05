// @/src/app/dashboard/(overview)/page.tsx

// Imports
import CreateTaskCard from "@/app/ui/dashboard/create-task-card";
import TaskCard  from "@/app/ui/task-card";

import { fetchDocuments } from "@/lib/server/appwrite";

export default async function Page() {

  // Gathers data from appwrite to be rendered
  const taskData = await fetchDocuments();
  const tasks = await taskData.documents;

  return (
    <div className="flex flex-1 flex-col h-full w-full bg-background p-4">
      
      {/* Title */}
      <div className="flex pl-1 pt-4 pb-5">
        <p className="font-semibold text-[40px]">All Tasks</p>
      </div>
      

      {/* Divider */}
      <div className="flex pl-2">
        <hr className="w-[10%] border-foreground rounded-full" />
      </div>

      {/* Task Section */}
      <div className="grid grid-cols-3 gap-4 pt-4">
        {tasks.map((card) =>
          <TaskCard 
            key={card.$id} 
            Title={card.Title}
            Description={card.Description}
            Date={card.Date}
            Important={card.Important}
            Completed={card.Completed}
          />
        )}
        <CreateTaskCard />
      </div>

    </div>
  );
}
