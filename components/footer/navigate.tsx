"use client";
import { rubik } from "@/font/font";
import { useScopedI18n } from "@/locales/client";
import { formatPath } from "@/utils/utils";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Navigate() {
  const t = useScopedI18n("footer");
  const pathname = usePathname();
  return (
    <div className="space-y-5">
      <h2 className="font-semibold text-xl uppercase">{t("navigate.title")}</h2>
      <ul className="justify-between gap-2 grid grid-cols-2 font-medium text-sm">
        <li
          className={clsx(
            rubik.className,
            "hover:bg-(--light)/20 rounded-sm flex",
            formatPath(pathname) === "/" && "!bg-(--light) !text-(--deep-dark)"
          )}
        >
          <Link href="/" className="p-3 rounded-sm w-full">
            {t("navigate.home")}
          </Link>
        </li>
        <li
          className={clsx(
            rubik.className,
            "hover:bg-(--light)/20 rounded-sm flex",
            formatPath(pathname) === "/management" &&
              "!bg-(--light) !text-(--deep-dark)"
          )}
        >
          <Link href="/management" className="p-3 rounded-sm w-full">
            {t("navigate.manage")}
          </Link>
        </li>
        <li
          className={clsx(
            rubik.className,
            "hover:bg-(--light)/20 rounded-sm flex",
            formatPath(pathname) === "/buy" &&
              "!bg-(--light) !text-(--deep-dark)"
          )}
        >
          <Link href="/buy" className="p-3 rounded-sm w-full">
            {t("navigate.buy")}
          </Link>
        </li>
        {/* <li
          className={clsx(
            rubik.className,
            "hover:bg-(--light)/20 rounded-sm flex",
            formatPath(pathname) === "/expertise" &&
              "!bg-(--light) !text-(--deep-dark)"
          )}
        >
          <Link href="/expertise" className="p-3 rounded-sm w-full">{t("navigate.expertise")}</Link>
        </li> */}
        <li
          className={clsx(
            rubik.className,
            "hover:bg-(--light)/20 rounded-sm flex",
            formatPath(pathname) === "/rent" &&
              "!bg-(--light) !text-(--deep-dark)"
          )}
        >
          <Link href="/rent" className="p-3 rounded-sm w-full">
            {t("navigate.rent")}
          </Link>
        </li>
        <li
          className={clsx(
            rubik.className,
            "hover:bg-(--light)/20 rounded-sm flex",
            formatPath(pathname) === "/contact" &&
              "!bg-(--light) !text-(--deep-dark)"
          )}
        >
          <Link href="/contact" className="p-3 rounded-sm w-full">
            {t("navigate.contact")}
          </Link>
        </li>
      </ul>
    </div>
  );
}
