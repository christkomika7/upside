"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { languages } from "@/data/langugage";
import { useChangeLocale, useCurrentLocale } from "@/locales/client";
import { useState } from "react";
import { ChevronDownIcon } from "../ui/icon";

export default function Language() {
  const [open, setOpen] = useState(false);
  const locale = useCurrentLocale();
  const changeLocale = useChangeLocale();

  function handleLanguage(l: "fr" | "en") {
    changeLocale(l);
    setOpen(false);
  }

  return (
    <Popover open={open} onOpenChange={(e) => setOpen(e)}>
      <PopoverTrigger>
        <div className="flex items-center gap-x-0.5 pl-2 cursor-pointer">
          <div className="flex items-center gap-x-1">
            <div className="rounded-full w-6 h-6 overflow-visible">
              {locale === "fr" && <languages.fr.flag />}
              {locale === "en" && <languages.en.flag />}
            </div>
            <p className="font-medium uppercase">{languages[locale].name}</p>
          </div>

          <span className="top-[3.5px] relative flex justify-center items-center w-2">
            <ChevronDownIcon className="fill-neutral-700" />
          </span>
        </div>
      </PopoverTrigger>

      <PopoverContent className="mt-6 p-1 rounded-full w-[100px]">
        <div className="hover:bg-(--brown)/20 p-2 rounded-full h-full cursor-pointer">
          <div
            onClick={() => handleLanguage(locale === "fr" ? "en" : "fr")}
            className="flex justify-center items-center gap-x-1"
          >
            <div className="rounded-full w-5 h-5">
              {locale === "fr" && <languages.en.flag />}
              {locale === "en" && <languages.fr.flag />}
            </div>
            <p className="font-medium uppercase">
              {locale === "fr" && languages.en.name}
              {locale === "en" && languages.fr.name}
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
