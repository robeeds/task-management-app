// @/src/app/dashboard/layout.tsx

// Imports
import SideNav from "@/components/sidenav"

export default function BlogLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
        <div className="flex flex-1 flex-col md:flex-row text-textPrimary bg-backgroundTertiary min-h-screen">
        

            {/* This will be the side navigation panel */}
            <div className="flex min-h-[80px] md:flex-1 md:max-w-[300px] rounded-[15px] mb-4 md:mb-0 md:mr-4">
                <SideNav />
            </div>

            {/* This will be the general task area */}
            <div className="flex flex-1 bg-backgroundSecondary p-4">
                {children}
            </div>
        </div>
    )
  }