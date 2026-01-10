"use client";
import { useScopedI18n } from "@/locales/client";
import { useState } from "react";
import { Skeleton } from "../ui/skeleton";

export default function Location() {
  const t = useScopedI18n("contact.location");
  const [isLoading, setIsLoading] = useState(true);
  return (
    <div className="relative bg-(--sand)">
      <div className="-top-[55px] left-0 z-10 absolute bg-(--sand) rounded-t-[64px] w-full h-14"></div>
      <div className="mx-auto px-2 pt-4 pb-44 max-w-[1140px]">
        <h2 className="mb-[46px] min-w-fit font-semibold text-(--deep-dark) text-[30px] md:text-[44px] text-center">
          {t("title.left")}{" "}
          <span className="text-(--turquoise)">{t("title.right")}</span>
        </h2>
        <div className="bg-[#e5e3df] rounded-[32px] w-full h-[450px]">
          {isLoading && (
            <Skeleton className="bg-[#e5e3df] rounded-[32px] w-full h-full animate-pulse" />
          )}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d7979.437010089424!2d9.428941!3d0.40528500000000006!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMMKwMjQnMTkuMCJOIDnCsDI1JzUzLjUiRQ!5e0!3m2!1sfr!2scg!4v1748389915378!5m2!1sfr!2scg"
            width="400"
            height="450"
            className="border-none rounded-[32px] w-full h-full"
            loading="eager"
            referrerPolicy="no-referrer-when-downgrade"
            onLoad={() => setIsLoading(false)}
            title="Upside Gabon Google Maps Location"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
