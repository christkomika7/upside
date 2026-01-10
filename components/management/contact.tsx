"use client";
import { rubik } from "@/font/font";
import clsx from "clsx";
import FormContact from "./form-contact";
import { useScopedI18n } from "@/locales/client";
import { RefObject } from "react";

type ContactProps = {
  ref: RefObject<HTMLDivElement | null>;
};

export default function Contact({ ref }: ContactProps) {
  const t = useScopedI18n("management.contact");
  return (
    <div className="relative bg-(--blue-light)">
      <div className="-top-[55px] left-0 z-10 absolute bg-(--blue-light) rounded-t-[64px] w-full h-14"></div>
      <div className="mx-auto px-2 pt-4 pb-44 max-w-[1140px]">
        <h2 className="font-semibold text-(--deep-dark) text-[30px] sm:text-[56px] text-center">
          {t("title.left")}
          {"-"}
          <span className="text-(--turquoise)">{t("title.right")}</span>
        </h2>
        <p
          className={clsx(
            "mx-auto mb-8 max-w-[512px] text-(--deep-dark) text-base md:text-xl text-center",
            rubik.className,
          )}
        >
          {t("subtitle")}
        </p>

        <FormContact ref={ref} />
      </div>
    </div>
  );
}
