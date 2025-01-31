import SideNav from "@/app/ui/dashboard/sidenav";
// import { Suspense } from "react";
// import Loading from "../ui/dashboard/loading";
 
export const experimental_ppr = false;
export const dynamic = 'force-dynamic';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
      <div className="flex flex-1 h-fullc">

      {/* Side navigation  */}
      <div className="flex flex-1 max-w-[330px] bg-background p-4">
        <SideNav />
      </div>

      {/* Task Section */}
      <div className="flex flex-1 items-center justify-center bg-shade pl-4">{children}</div>

    </div>
  );
}