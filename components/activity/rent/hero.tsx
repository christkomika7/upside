import React from "react";
import Header from "../../header";
import { hero_buy } from "@/data";
import { useScopedI18n } from "@/locales/client";

export default function Hero() {
  const t = useScopedI18n("rent.hero");
  return (
    <>
      <Header
        title={t("title")}
        img="/assets/rent/hero.png"
        services={hero_buy}
        section="rent"
      />
    </>
  );
}
