import { hero_contact } from "@/data";
import Header from "../header";
import { useScopedI18n } from "@/locales/client";

export default function Hero() {
  const t = useScopedI18n("contact.hero");
  return (
    <Header
      title={t("title")}
      img="/assets/contact/hero.png"
      content={t("subtitle")}
      services={hero_contact}
      section="contact"
    />
  );
}
