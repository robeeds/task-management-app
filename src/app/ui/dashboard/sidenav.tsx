// Next Imports
import Image from "next/image";

// Appwrite Functions
import { getLoggedInUser, logOutUser, verifyEmail } from "@/lib/server/appwrite";

// Component Imports
import NavLinks from "./nav-links";
import logoutIcon from "../../../../public/logout.svg"

export default async function SideNav() {
  const user = await getLoggedInUser();
  return (
    <div className="flex flex-1 flex-col h-full">

      {/* This will be the username section */}
      <div className="flex flex-col bg-backgroundTwo rounded-[10px]">
        <p className="flex flex-col p-4 text-wrap">
          Logged in as: <br/> 
          <strong>{user?.name}</strong>
        </p>

        {/* Verification Status: If the user is not verified on the Appwrite Backend, then it'll send an email */}
        <p className="flex p-4">Status:</p>
        <button onClick={verifyEmail}>Verify Email</button>
        <p></p>

      </div>
      
      {/* This is the divider */}
      <div className="flex p-4">
        <hr className="flex flex-1 w-full border-foreground rounded-full" />
      </div>

      {/* This will be the links section */}
      <div className="flex flex-1 flex-col bg-backgroundTwo rounded-[10px]">

        {/* User Navigation Links */}
        <div className="flex flex-1 h-full w-full">
          <NavLinks />
        </div>

        {/* This will be the logout button */}
        <div className="flex p-4">
          <button className="flex flex-row items-center justify-center" onClick={logOutUser}>
            <Image
              src={logoutIcon}
              alt="logout icon"
              width={32}
              height={32}
            />
            <p className="flex flex-1 p-2">Logout</p>
          </button>
        </div>
        

      </div>
    </div>
  );
}
