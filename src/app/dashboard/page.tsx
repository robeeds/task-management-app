export const dynamic = 'force-dynamic';

// User Interface Components
import SideNav from "@/ui/dashboard/sidenav";

export default async function Dashboard() {
  return (
    <div className="flex flex-1 h-screen bg-shade">
      <div className="flex flex-1">
        <div className="flex flex-1 h-full max-w-[330px] bg-background p-4">
          <SideNav />
        </div>

        <div className="flex flex-1 p-4">
          Task Section
        </div>

      </div>
      
    </div>
  );
}
