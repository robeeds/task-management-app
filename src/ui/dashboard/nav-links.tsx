"use client";

// Icons
import homeIcon from "../../../public/home.svg";
import checkIcon from "../../../public/check.svg";
import starIcon from "../../../public/star.svg";

// Nextjs Imports
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const links = [
  { name: "All tasks", href: "/dashboard", icon: homeIcon },
  {
    name: "Important",
    href: "/dashboard/important",
    icon: starIcon,
  },
  { name: "Completed", href: "/dashboard/completed", icon: checkIcon },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <div className="">
      {links.map((link) => {
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx("flex flex-1 items-center justify-center", {
              "bg-sky-100 text-blue-600": pathname === link.href,
            })}
          >
            <Image 
              src={link.icon} 
              alt={link.name}
              width={32}
              height={32}
            />
            <p className="p-2">{link.name}</p>
          </Link>
        );
      })}
    </div>
  );
}
