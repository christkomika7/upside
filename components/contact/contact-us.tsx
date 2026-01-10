"use client";
import FormContact from "./form-contact";
import clsx from "clsx";
import { rubik } from "@/font/font";
import { useScopedI18n } from "@/locales/client";

export default function ContactUs() {
  const t = useScopedI18n("contact.form");
  return (
    <div className="relative bg-(--blue-light)">
      <div className="-top-[55px] left-0 z-40 absolute bg-(--blue-light) rounded-t-[64px] w-full h-14"></div>
      <div className="mx-auto px-2 pt-4 pb-44 max-w-[1140px]">
        <h2 className="font-semibold text-(--deep-dark) text-[30px] md:text-[56px] text-center">
          {t("title.left")}{" "}
          <span className="text-(--turquoise)">{t("title.right")}</span>
        </h2>
        <p
          className={clsx(
            rubik.className,
            "md:text-xl text-base text-center max-w-[604px] mx-auto mb-8"
          )}
        >
          {t("subtitle")}
        </p>

        <div className="space-y-4 mx-auto max-w-[896px]">
          <FormContact />
        </div>
      </div>
    </div>
  );
}
