"use client";
import { LayoutDashboard, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const navlinks = [
  {
    label: "Dashboard",
    href: "/",
    Icon: LayoutDashboard,
  },
  {
    label: "Profile",
    href: "/user",
    Icon: User,
  },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="absolute left-0 top-0 bottom-0 bg-primary w-[250px] h-[92vh]">
      <ul className="w-full flex flex-col gap-2 p-2">
        {navlinks.map(({ label, href, Icon }) => {
          const isActive = pathname === href;
          return (
            <li
              key={label}
              className={`w-full text-xl font-semibold py-2 px-4 rounded-md ${
                isActive ? "bg-white text-primary" : "text-white"
              }`}
            >
              <Link href={href} className="flex items-center gap-4">
                <Icon className="h-5 w-5" />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
