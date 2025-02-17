// @/src/test/sidenav.tsx

// Imports
import { getUser } from "@/app/actions/auth"
import LogoutButton from "./logout-button"
import NavLinks from "./navlinks";
import SettingsButton from "./settings-button";

export default async function SideNav() {
    const username = await getUser();
    return (
        <div className="flex flex-1 flex-row items-center md:items-start md:flex-col bg-backgroundSecondary p-4">

            {/* Username Section with Gear Icon (Settings) */}
            <div className="flex flex-row md:w-full md:items-center md:justify-between bg-backgroundPrimary rounded-l-[15px] md:rounded-bl-none md:rounded-t-[15px] md:rounded-tr-none p-4">

                <div className="hidden md:flex md:flex-col">
                    <p>Logged in as: </p>
                    <p>{username}</p>
                </div>

                {/* Pass the settings button as a client component later on */}
                <SettingsButton />

            </div>
            
            {/* Divider */}
            <div className="hidden md:flex md:w-full px-2 py-4">
                <hr className="flex flex-1 w-full border-textPrimary rounded-full" />
            </div>

            {/* Navigational Links */}
            <div className="flex flex-1 w-full md:flex-col justify-between md:pt-4 bg-backgroundPrimary pl-0 p-4 md:pl-4 rounded-r-[15px] md:rounded-tr-none md:rounded-bl-[15px] md:rounded-br-none">
                <div className="flex flex-1">
                    <NavLinks />
                </div>

                {/* This should be the logout button */}
                <div className="flex">
                    <LogoutButton />
                </div>
            </div>

        </div>
    )
}