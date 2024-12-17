// Components
import NewTaskCard from "@/app/ui/dashboard/create-task-card";

export default function Page() {
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
      <div className="grid grid-cols-3 gap-2 pt-4">
        <NewTaskCard />
      </div>

    </div>
  );
}
