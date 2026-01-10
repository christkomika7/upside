import React from "react";
import { MailIcon, MapPinIcon, PhoneIcon } from "../ui/icon";
import { useScopedI18n } from "@/locales/client";

export default function Contact() {
  const t = useScopedI18n("contact.hero.cards.buy3");

  return (
    <div className="space-y-5 pt-7">
      <p className="items-center gap-x-2 grid grid-cols-[44px_1fr] text-(--light) text-sm">
        <span className="flex justify-center items-center bg-(--light)/20 p-3.5 rounded-full w-12 h-12">
          <MapPinIcon />
        </span>
        <span>{t("content")}</span>
      </p>
      <p className="items-center gap-x-2 grid grid-cols-[44px_1fr] text-(--light) text-sm">
        <span className="flex justify-center items-center bg-(--light)/20 p-3.5 rounded-full w-12 h-12">
          <PhoneIcon className="fill-white" />
        </span>
        <span className="flex flex-col">
          <span>+241 66 48 48 07</span>
          <span>+241 76 48 48 06</span>
        </span>
      </p>
      <p className="items-center gap-x-2 grid grid-cols-[44px_1fr] text-(--light) text-sm">
        <span className="flex justify-center items-center bg-(--light)/20 p-3.5 rounded-full w-11 h-11">
          <MailIcon />
        </span>
        <span>info@upside-gabon.com</span>
      </p>
    </div>
  );
}
