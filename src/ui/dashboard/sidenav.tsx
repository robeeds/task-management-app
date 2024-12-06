// Appwrite Functions
import { getLoggedInUser, logOutUser } from "@/lib/server/appwrite";

// Navlinks
import NavLinks from "./nav-links";

// Logout Function

export default async function SideNav() {
    const user = await getLoggedInUser();
    return (
        <div className="flex flex-1 flex-col h-full">
            
            {/* This will be the username section */}
            <div className="flex flex-1 bg-backgroundTwo p-2 rounded-t-[15px]">
                <p className="">Logged in as: <strong>{user?.name}</strong></p>
            </div>

            
            {/* This will be the links section */}
            <div className="flex flex-col h-full p-2 rounded-t-[10px]">
                <NavLinks />
            </div>

            {/* This will be the logout button */}
            <div className="flex p-2">
                <button
                    onClick={logOutUser}
                >Logout
                </button>
            </div>
        </div>
    )
}