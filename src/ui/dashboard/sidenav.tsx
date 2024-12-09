// Next Imports
import Image from "next/image";


// Appwrite Functions
import { getLoggedInUser, logOutUser } from "@/lib/server/appwrite";

// Component Imports
import NavLinks from "./nav-links";
import logoutIcon from "../../../public/logout.svg"

export default async function SideNav() {
  const user = await getLoggedInUser();
  return (
    <div className="flex flex-1 flex-col h-full">

      {/* This will be the username section */}
      <div className="flex flex-1 bg-backgroundTwo rounded-[10px]">
        <p className="flex flex-col p-4 text-wrap">
          Logged in as: <br/> 
          <strong>{user?.name}</strong>
        </p>
      </div>
      
      {/* This is the divider */}
      <div className="flex p-4">
        <hr className="flex flex-1 w-full border-foreground rounded-full" />
      </div>

      {/* This will be the links section */}
      <div className="flex flex-col h-full bg-backgroundTwo p-4 rounded-[10px]">

        {/* User Navigation Links */}
        <div className="flex flex-1">
          <NavLinks />
        </div>

        {/* This will be the logout button */}
        <div className="flex flex-row">
          <Image
            src={logoutIcon}
            alt="logout icon"
            width={32}
            height={32}
          />
          <button className="p-2" onClick={logOutUser}>Logout</button>
        </div>
        

      </div>
    </div>
  );
}
