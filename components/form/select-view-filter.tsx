"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PropertyIdType } from "@/data";
import { useScopedI18n } from "@/locales/client";
import clsx from "clsx";
import React, { useRef, useState } from "react";
import v from "voca";
import { Spinner } from "../ui/spinner";
import { rubik } from "@/font/font";
import { ViewType } from "@/lib/type";

type SelectViewFilterProps = {
  placeholder: string;
  items: { id: string; content: string }[];
  setValue: React.Dispatch<React.SetStateAction<string>>;
  value: string;
  showValue?: true;
  className?: string;
  hasIcon?: React.ReactNode;
  hasBackground?: boolean;
};

export default function SelectViewFilter({
  placeholder,
  value,
  items = [],
  setValue,
  showValue,
  className,
  hasIcon,
  hasBackground = false,
}: SelectViewFilterProps) {
  const [open, setOpen] = useState(false);
  const t = useScopedI18n("filter");
  const tv = useScopedI18n("product.views");
  const containerRef = useRef<HTMLButtonElement>(null);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger ref={containerRef} asChild>
        <span
          className={clsx(
            "group flex items-center hover:bg-(--brown)/20 rounded-full h-full font-medium text-sm cursor-pointer",
            rubik.className,
            hasBackground && "bg-(--brown)/10",
            value === "" || (value !== t("view") && "!bg-(--brown)")
          )}
        >
          <span
            className={clsx(
              "flex px-6 py-3 border-neutral-300 border-r group-hover:border-none",
              className,
              value === "" || (value !== t("view") && "!border-none")
            )}
          >
            {hasIcon}
            {showValue && value
              ? tv(value.toLowerCase().replaceAll(" ", "_") as ViewType)
              : placeholder}{" "}
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
          {items.length === 0 && (
            <li className="flex justify-center p-4 text-center">
              {t("empty")}
            </li>
          )}
          {items.length > 0 &&
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
                  t(
                    `views.${id as "property1" | "property2" | "property3" | "property4"}`
                  )
                )}
              </li>
            ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
}
