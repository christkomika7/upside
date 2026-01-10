import Header from "../../header";
import { hero_buy } from "@/data";
import { useScopedI18n } from "@/locales/client";

export default function Hero() {
  const t = useScopedI18n("buy.hero");
  return (
    <>
      <Header
        title={t("title")}
        img="/assets/buy/hero.png"
        services={hero_buy}
        section="buy"
      />
    </>
  );
}
