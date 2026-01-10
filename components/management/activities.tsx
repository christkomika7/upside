"use client";
import { useScopedI18n } from "@/locales/client";
import ActivityCard from "../card/activity-card";
import { activiesList } from "@/data";

export default function Activities() {
  const t = useScopedI18n("management.activities");
  return (
    <div className="relative bg-(--light) pt-16 pb-28">
      <div className="-top-[55px] left-0 z-10 absolute bg-(--light) rounded-t-[64px] w-full h-14"></div>

      <div className="space-y-4 mx-auto px-2 pt-4 pb-44 max-w-[1140px]">
        <div className="flex justify-center pb-8 w-full">
          <p className="max-w-6xl text-(--deep-dark) text-lg sm:text-xl md:text-2xl text-center">
            {t("content", { value: <br /> })}
          </p>
        </div>
        <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr]">
          <ActivityCard activity={activiesList[0]} />
          <ActivityCard activity={activiesList[1]} />
        </div>
        <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_1.5fr]">
          <ActivityCard activity={activiesList[2]} />
          <ActivityCard activity={activiesList[3]} />
        </div>
        <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr]">
          <ActivityCard activity={activiesList[4]} />
          <ActivityCard activity={activiesList[5]} />
        </div>
      </div>
    </div>
  );
}
