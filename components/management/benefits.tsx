import React from "react";
import BenefitCard from "../card/benefit-card";
import { benefits } from "@/data";
import { useScopedI18n } from "@/locales/client";

export default function Benefits() {
  const t = useScopedI18n("management.benefits");
  return (
    <div className="relative bg-(--dark-green)">
      <div className="-top-[55px] left-0 z-10 absolute bg-(--dark-green) rounded-t-[64px] w-full h-14"></div>
      <div className="mx-auto px-2 pt-4 pb-44 max-w-[1140px]">
        <div className="flex justify-center items-center gap-x-12 mb-[54px]">
          <h2 className="min-w-fit font-semibold text-(--blue-light) text-[30px] sm:text-[44px] text-center">
            <span className="text-(--bright-green)">{t("title.left")}</span>{" "}
            {t("title.right")}
          </h2>
        </div>
        <div className="space-y-4">
          <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
            <BenefitCard service={benefits[0]} />{" "}
            <BenefitCard service={benefits[1]} />
            <BenefitCard service={benefits[2]} />
            <BenefitCard service={benefits[3]} />{" "}
            <BenefitCard service={benefits[4]} />
            <BenefitCard service={benefits[5]} />{" "}
            <BenefitCard service={benefits[6]} />
            <BenefitCard service={benefits[7]} />
          </div>
        </div>
      </div>
    </div>
  );
}
