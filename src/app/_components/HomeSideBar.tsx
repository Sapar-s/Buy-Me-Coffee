"use client";

import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export const HomeSideBar = () => {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/explore", label: "Explore" },
    { href: "/view-page", label: "View page", icon: <ExternalLink /> },
    { href: "/acc-settings", label: "Account settings" },
  ];
  return (
    <div className="w-[251px] flex flex-col items-start gap-1 ">
      {links.map(({ href, label, icon }) => (
        <Link key={href} href={href}>
          <Button
            variant={"ghost"}
            className={`w-[250px] h-[36px] cursor-pointer text-[14px] font-[500] leading-[20px] flex items-center justify-start ${
              pathname === href ? "bg-[#f4f4f5] text-accent-foreground" : ""
            }`}
          >
            <span className="ml-1 ">{label}</span>
            {icon && <span className="ml-2 ">{icon}</span>}
          </Button>
        </Link>
      ))}
    </div>
  );
};
