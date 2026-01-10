"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PropertyIdType } from "@/data";
import { useScopedI18n } from "@/locales/client";
import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import v from "voca";
import { Spinner } from "../ui/spinner";
import { rubik } from "@/font/font";

type SelectFilterProps = {
  placeholder: string;
  items: { id: string; content: string }[];
  setValue: React.Dispatch<React.SetStateAction<string>>;
  value: string;
  type?: string;
  isLoading?: boolean;
  suffix?: string;
  showValue?: true;
  className?: string;
  hasIcon?: React.ReactNode;
  hasBackground?: boolean;
};

export default function SelectFilter({
  placeholder,
  value,
  items = [],
  setValue,
  type,
  suffix,
  showValue,
  className,
  isLoading,
  hasIcon,
  hasBackground = false,
}: SelectFilterProps) {
  const [open, setOpen] = useState(false);
  const t = useScopedI18n("filter");
  const f = useScopedI18n("home.filter");
  const containerRef = useRef<HTMLButtonElement>(null);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger ref={containerRef} asChild>
        <span
          className={clsx(
            "group flex items-center hover:bg-(--brown)/20 rounded-full h-full font-medium text-sm cursor-pointer",
            hasBackground && "bg-(--brown)/10",
            rubik.className,
            value === "" || (value !== t("property") && "!bg-(--brown)")
          )}
        >
          <span
            className={clsx(
              "flex items-center px-6 py-3 border-neutral-300 border-r group-hover:border-none",
              className,
              value === "" || (value !== t("property") && "!border-none")
            )}
          >
            {hasIcon} {showValue && value ? value : placeholder}{" "}
            {suffix && value && (
              <>
                {suffix}
                {Number(value) > 1 && "s"}{" "}
              </>
            )}
          </span>
        </span>
      </PopoverTrigger>
      <PopoverContent
        className={clsx(
          "bg-(--light) shadow-neutral-400/30 shadow-xl p-0 rounded-[20px] overflow-hidden"
        )}
        style={{
          width: containerRef.current?.clientWidth,
          minWidth: 260,
        }}
      >
        <ul className="font-medium text-(--deep-dark)">
          {isLoading && (
            <li className="flex justify-center p-4 text-center">
              <Spinner className="w-4 h-4" />
            </li>
          )}
          {!isLoading && items.length === 0 && (
            <li className="flex justify-center p-4 text-center">
              {t("empty")}
            </li>
          )}
          {!isLoading &&
            items.length > 0 &&
            items.map(({ id, content }) => (
              <li
                key={id}
                onClick={() => {
                  setValue(value === content ? "" : content);
                  setOpen(false);
                }}
                className={clsx(
                  "hover:bg-(--brown)/20 p-2 text-center cursor-pointer",
                  content === value && "!bg-(--brown)"
                )}
              >
                {v.titleCase(
                  type === "property"
                    ? t(`properties.${id as PropertyIdType}`)
                    : type === "price" && content === "Sans prix"
                      ? f("noPrice")
                      : content
                )}
              </li>
            ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
}
