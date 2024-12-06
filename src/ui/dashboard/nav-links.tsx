'use client';

// Icons
import homeIcon from "../../../public/home.svg";
import checkIcon from "../../../public/check.svg";
import starIcon from "../../../public/star.svg"

// Nextjs Imports
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import clsx from 'clsx';

const links = [
    { name: 'All tasks', href: '/dashboard', icon: homeIcon },
    {
        name: 'Important',
        href: '/important',
        icon: starIcon,
    },
    { name: 'Completed', href: '/completed', icon: checkIcon },
];

export default function NavLinks() {
    const pathname = usePathname();

    return (
      <>
        {links.map((link) => {
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex grow items-center justify-center gap-2 ',
              {
                'bg-sky-100 text-blue-600': pathname === link.href,
              },
            )}
          >
            <Image 
              src={link.icon}
              alt="icon"/>
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
        })}
      </>
    )
}