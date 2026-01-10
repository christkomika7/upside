"use client";
import { BenefitType, TeamServiceType } from "@/data";
import { rubik } from "@/font/font";
import { useScopedI18n } from "@/locales/client";
import clsx from "clsx";
import { ArrowUpRightIcon } from "lucide-react";
import React from "react";

type ServiceCardProps = {
  className?: string;
  service: BenefitType;
};

export default function BenefitCard({
  className,
  service: { id },
}: ServiceCardProps) {
  const t = useScopedI18n("management.benefits.cards");
  return (
    <div
      className={clsx(
        "flex flex-col justify-between bg-white/10 p-6 rounded-[32px] h-full",
        className
      )}
    >
      <div className="space-y-0.5">
        <h2
          className={clsx(
            "mb-3 font-medium text-(--light) text-2xl",
            rubik.className
          )}
        >
          {t(`${id}.title`)}
        </h2>
        <p className={clsx("mb-6 text-(--light) text-sm", rubik.className)}>
          {t(`${id}.content`)}
        </p>
      </div>
      <span className="text-(--turquoise)">
        <ArrowUpRightIcon size={30} />
      </span>
    </div>
  );
}
