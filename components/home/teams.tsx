"use client";
import { teams, teamServices } from "@/data";
import React from "react";
import TeamCard from "../card/team-card";
import ServiceCard from "../card/service-card";
import TeamSlider from "../caroussel/team-slider";
import { useScopedI18n } from "@/locales/client";

export default function Teams() {
  const t = useScopedI18n("teams");
  return (
    <div className="bg-(--light)">
      <div className="mx-auto px-2 pt-16 pb-44 max-w-[1140px]">
        <h2 className="font-semibold text-(--deep-dark) text-[30px] sm:text-[56px] text-center">
          {t("title.left")}{" "}
          <span className="text-(--turquoise)">{t("title.right")}</span>
        </h2>
        <p className="mb-9 md:mb-18 text-(--deep-dark) text-base md:text-xl text-center">
          {t("subtitle")}
        </p>

        <div className="hidden justify-center gap-8 md:grid grid-cols-2 lg:grid-cols-3 mb-18">
          {teams.map((team) => (
            <TeamCard key={team.id} {...team} />
          ))}
        </div>
        <div className="md:hidden block relative space-y-14 pt-18">
          <TeamSlider />
        </div>

        <div className="flex flex-col justify-center items-center bg-(--dark-green) p-6 rounded-[48px]">
          <h2 className="min-w-fit font-semibold text-(--blue-light) text-[30px] sm:text-[56px] text-center">
            {t("why.title.left")}{" "}
            <span className="text-(--bright-green)">
              {t("why.title.right")}
            </span>
          </h2>
          <p className="mb-12 max-w-[776px] text-(--light) text-base md:text-xl text-center">
            {t("why.subtitle")}
          </p>

          <div className="gap-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full">
            {teamServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
