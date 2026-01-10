"use client";
import { ActivityType } from "@/data";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useScopedI18n } from "@/locales/client";
import clsx from "clsx";
import Image from "next/image";
import React from "react";

type ActivityCardProps = {
  className?: string;
  activity: ActivityType;
};

export default function ActivityCard({
  className,
  activity,
}: ActivityCardProps) {
  const t = useScopedI18n("management.activities.cards");
  const isMobile = useIsMobile();

  return (
    <div
      className={clsx(
        "group relative bg-white p-5 rounded-[32px] w-full overflow-hidden",
        className
      )}
    >
      <div className="top-0 left-0 absolute group-hover:bg-(--brown) opacity-0 group-hover:opacity-100 p-5 w-full h-full transition-all duration-300 ease-in-out">
        <h2 className="mb-3 font-semibold text-(--deep-dark) text-2xl">
          {t(`${activity.id}.title`)}
        </h2>
        <p className="top-[320px] group-hover:top-0 relative text-sm transition-all duration-300 ease-in-out">
          {t(`${activity.id}.content`)}
        </p>
      </div>
      <h2 className="mb-3 font-semibold text-(--deep-dark) text-2xl">
        {t(`${activity.id}.title`)}
      </h2>
      <div className="mb-2.5 rounded-[22px] w-full h-[280px] overflow-hidden">
        <Image
          src={activity.img}
          alt={t(`${activity.id}.title`)}
          width={400}
          height={230}
          priority
          unoptimized
          className="w-full h-full object-cover"
          style={{
            objectPosition: "50% 30%",
          }}
        />
      </div>
      <>
        {isMobile && (
          <p className="font-normal sm:font-medium text-sm sm:text-base">
            {t(`${activity.id}.content`)}{" "}
          </p>
        )}
        {!isMobile && (
          <p className="overflow-hidden font-normal sm:font-medium text-sm sm:text-base truncate text-ellipsis whitespace-nowrap">
            {t(`${activity.id}.content`)}{" "}
          </p>
        )}
      </>
    </div>
  );
}
