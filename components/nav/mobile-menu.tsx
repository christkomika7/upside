"use client";
import { MenuIcon, XIcon } from "lucide-react";
import { FacebookIcon, InstagramIcon, Linkedin2Icon } from "../ui/icon";
import { useEffect, useState } from "react";
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

type MobileMenuProps = {
  larger: number;
  width: number;
};

export default function MobileMenu({ larger, width }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const t = useScopedI18n("navigation");

  useEffect(() => {
    if (width > 767) {
      setOpen(false);
    }
  }, [width]);

  function handleClose() {
    setOpen(false);
  }

  return (
    <Popover open={open} onOpenChange={(e) => setOpen(e)}>
      <PopoverTrigger asChild>
        <span className="mds:hidden flex cursor-pointer">
          {open && <XIcon size={15} />}
          {!open && <MenuIcon size={15} />}
        </span>
      </PopoverTrigger>
      <PopoverContent
        style={{ width: larger, maxWidth: larger }}
        className="space-y-2 bg-white shadow-neutral-400/30 shadow-xl mx-[32px] mt-7 p-0 rounded-[20px] w-full overflow-hidden"
      >
        <div className="space-y-2 px-0 xs:px-3">
          <ul className="gap-2 grid grid-cols-1 xs:grid-cols-2 p-3">
            {siteConfig.navmenu.map((menu) => (
              <li key={menu.id} className="flex w-full">
                <Link
                  onClick={handleClose}
                  href={menu.url}
                  className={clsx(
                    "hover:bg-(--brown)/20 py-2 xs:py-3 rounded-full w-full font-medium text-sm text-center",
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
                href="https://www.facebook.com/upsidegabon"
                target="_blank"
                className="flex items-center !w-5 !h-5"
              >
                <FacebookIcon className="left-0.5 relative fill-neutral-700" />
              </Link>
            </li>
            <li>
              <Link
                href="https://www.instagram.com/upside_gabon/"
                target="_blank"
                className="flex justify-center items-center !w-5 !h-5"
              >
                <InstagramIcon className="fill-neutral-700" />
              </Link>
            </li>
            <li>
              <Link
                href="https://www.linkedin.com/company/upside-gabon-agence-immobilière/?viewAsMember=true"
                target="_blank"
                className="flex justify-center items-center !w-5 !h-5"
              >
                <Linkedin2Icon className="fill-neutral-700" />
              </Link>
            </li>
          </ul>
        </div>
      </PopoverContent>
    </Popover>
  );
}
