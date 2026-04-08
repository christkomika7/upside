import Image from "next/image";
import Filter from "../filter/filter";
import { useScopedI18n } from "@/locales/client";

export default function Hero() {
  const t = useScopedI18n("home.hero");
  return (
    <header className="relative min-h-hero">
      {/* tall:min-h-[900px] */}
      <Image
        src="/assets/home/home.png"
        alt="Hero"
        fill
        priority
        className="top-0 left-0 z-2 absolute w-full h-full object-center object-cover"
      />
      <div className="z-10 relative flex flex-col justify-center items-center px-2 sm:px-4 pt-32.5 pb-22.5 w-full h-full">
        <h2 className="mb-8 max-w-5xl font-bold text-[32px] text-neutral-100 xs:text-[42px] md:text-[58px] lg:text-[78px] text-center leading-[110%]">
          {t("title")}
        </h2>
        <p className="-top-6 relative mb-2 max-w-5xl text-(--light) text-lg xs:text-xl sm:text-3xl text-center">
          {t("subtitle")}
        </p>
        <Filter />
      </div>
    </header>
  );
}
