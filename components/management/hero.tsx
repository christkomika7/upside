"use client";
import Image from "next/image";
import { useScopedI18n } from "@/locales/client";

export default function Hero() {
  const t = useScopedI18n("management");
  return (
    <header className="relative flex flex-col justify-center items-center w-full h-full min-h-screen tall:min-h-[900px]">
      <Image
        src="/assets/manaement/hero.png"
        alt="Hero Management"
        fill
        className="top-0 absolute w-full h-full object-center object-cover"
      />
      <div className="top-0 left-0 z-10 absolute bg-gradient-to-t from-(--dark-turquoise) to-transparent w-full h-full"></div>
      <div className="z-20 relative flex flex-col justify-center items-center px-2 w-full h-full">
        <h2 className="mb-2 max-w-[855px] font-bold text-[40px] text-neutral-100 landscape:lg:text-[58px] landscape:text-[30px] sm:text-[42px] md:text-[58px] lg:text-[78px] text-center leading-[110%]">
          {t("title")}
        </h2>
        <p className="max-w-[855px] text-neutral-100 text-base sm:text-xl text-center">
          {t("subtitle")}
        </p>
      </div>
    </header>
  );
}
