// @/src/app/dashboard/page.tsx

import LogoutButton from "@/test/logout-button";

export default function Page() {
    return (
        <div className="text-textPrimary bg-backgroundSecondary min-h-screen">
            Testing Dashboard

            {/* TODO: Create the side navigation panel and subscribe the user to realtime events in the database */}

            {/* This will be the side navigation panel */}
            <LogoutButton />

            {/* This will be the general task area */}
        </div>
    )
}