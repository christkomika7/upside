import React from "react";
import Logo from "../logo";
import Contact from "./contact";
import Navigate from "./navigate";
import Newsletter from "./newsletter";
import { useScopedI18n } from "@/locales/client";

export default function Footer() {
  const t = useScopedI18n("footer");
  return (
    <footer className="bg-(--deep-dark)">
      <div className="flex flex-col items-start mx-auto px-4 pt-18 pb-24 max-w-[1140px] text-white">
        <div className="h-12">
          <Logo theme="light" />
        </div>
        <div className="justify-between gap-x-4 gap-y-[44px] lg:gap-x-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-2 pb-12 border-b border-b-(--light) w-full">
          <Contact />
          <Navigate />
          <Newsletter />
        </div>
        <div className="flex justify-center gap-x-1 py-6 w-full font-medium text-sm sm:text-left text-center">
          <p className="text-(--light)">{t("title")}</p>
        </div>
      </div>
    </footer>
  );
}
