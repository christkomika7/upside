"use client";
import { FacebookIcon, InstagramIcon, MenuIcon, XIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import clsx from "clsx";
import { siteConfig } from "@/lib/sites";
import Link from "next/link";
import { rubik } from "@/font/font";
import { usePathname } from "next/navigation";
import { formatPath } from "@/utils/utils";
import { useScopedI18n } from "@/locales/client";

type DashboardMobileMenuProps = {
  children: React.ReactNode;
  top?: number;
};

export default function DashboardMobileMenu({
  children,
  top,
}: DashboardMobileMenuProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const t = useScopedI18n("navigation");

  function handleClose() {
    setOpen(false);
  }

  return (
    <Popover open={open} onOpenChange={(e) => setOpen(e)}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        className="z-[10000] relative space-y-2 bg-white shadow-neutral-400/30 shadow-sm mx-[32px] p-0 rounded-[20px] w-full overflow-hidden"
        style={{
          marginTop: top ?? 28,
        }}
      >
        <div className="space-y-2">
          <ul className="gap-2 grid grid-cols-2 p-4">
            {siteConfig.navmenu.map((menu) => (
              <li key={menu.id} className="flex w-full">
                <Link
                  onClick={handleClose}
                  href={menu.url}
                  className={clsx(
                    "hover:bg-(--brown)/20 py-4 rounded-md w-full font-medium text-sm text-center",
                    rubik.className,
                    formatPath(pathname) === menu.url && "bg-(--brown)"
                  )}
                >
                  {t(menu.id)}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="flex justify-center items-center gap-x-4 pb-5">
            <li>
              <Link
                onClick={handleClose}
                href="/"
                className="fill-neutral-700 stroke-neutral-700"
              >
                <FacebookIcon size={20} />
              </Link>
            </li>
            <li>
              <Link
                onClick={handleClose}
                href="/"
                className="fill-neutral-700 stroke-neutral-700"
              >
                <InstagramIcon size={20} />
              </Link>
            </li>
          </ul>
        </div>
      </PopoverContent>
    </Popover>
  );
}
