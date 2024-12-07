// User Interface Components
import SideNav from "@/ui/dashboard/sidenav";

export default async function Dashboard() {
  return (
    <div className="flex flex-1 h-screen p-8">
      <div className="flex flex-1 h-full max-w-[330px]">
        <SideNav />
      </div>

      <div className="flex flex-1">Task Section</div>
    </div>
  );
}
