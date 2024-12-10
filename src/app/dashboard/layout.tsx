import SideNav from "@/app/ui/dashboard/sidenav";
 
export const experimental_ppr = false;
export const dynamic = 'force-dynamic';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-1">

      {/* Side navigation  */}
      <div className="flex flex-1 max-w-[330px] bg-background p-4">
        <SideNav />
      </div>

      {/* Task Section */}
      <div className="flex flex-1 bg-shade">{children}</div>

    </div>
  );
}