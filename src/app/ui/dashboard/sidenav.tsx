// Next Imports
import Image from "next/image";

// Appwrite Functions
import { getLoggedInUser, logOutUser, getEmailVerificationStatus } from "@/lib/server/appwrite";

// Component Imports
import NavLinks from "./nav-links";
import logoutIcon from "../../../../public/logout.svg"

export default async function SideNav() {
  const user = await getLoggedInUser();
  const emailVerificationStatus = await getEmailVerificationStatus();

  return (
    <div className="flex flex-1 flex-col h-full">

      {/* This will be the username section */}
      <div className="flex flex-col bg-backgroundTwo rounded-[10px]">
        <p className="flex flex-col p-4 text-wrap">
          Logged in as: <br/> 
          <strong>{user?.name}</strong>
        </p>

        {/* Verification Status: If the user is not verified on the Appwrite Backend, then it'll send an email */}
        <div className="flex flex-1 flex-row items-center">
          <p className="flex p-4">Status:</p>
          <div className="flex">
            {emailVerificationStatus ? 
              <p className="text-lime">Verified!</p>
              : 
              <div className="flex flex-nowrap">
                {/* The button sends a verification email. Probably going to adjust this in the future to be easier to understand */}
                  <a className="text-red-500">Check Email for Verification</a>
              </div>
            }
          </div>
          
        </div>

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
