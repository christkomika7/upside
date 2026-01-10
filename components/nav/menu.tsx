"use client";
import { rubik } from "@/font/font";
import { siteConfig } from "@/lib/sites";
import { useScopedI18n } from "@/locales/client";
import { formatPath } from "@/utils/utils";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Menu() {
  const pathname = usePathname();
  const t = useScopedI18n("navigation");
  return (
    <ul className="hidden mds:flex items-center gap-x-1">
      {siteConfig.navmenu.map((menu) => (
        <li key={menu.id}>
          <Link
            href={menu.url}
            className={clsx(
              "hover:bg-(--brown)/20 px-2.5 ms:px-4 py-3 rounded-full font-medium text-sm",
              rubik.className,
              `/${formatPath(pathname).split("/")[1]}` === menu.url &&
                "!bg-(--brown)"
            )}
          >
            {t(menu.id)}
          </Link>
        </li>
      ))}
    </ul>
  );
}
