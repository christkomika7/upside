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

type CustomSelectProps = {
  children: React.ReactNode;
  placeholder: string;
  data?: { id: string; content: string }[];
  addData?: React.Dispatch<React.SetStateAction<string>>;
  hasIcon?: boolean;
  type?: string;
  isLoading?: boolean;
};

export default function CustomSelect({
  children,
  placeholder,
  data = [],
  addData,
  hasIcon = true,
  type,
  isLoading,
}: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(placeholder);
  const t = useScopedI18n("filter");
  const containerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    addData?.(value);
  }, [value, addData]);

  const handleValue = (v: string) => {
    setValue(v === value ? placeholder : v);
    setOpen(false);
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger ref={containerRef} asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent
        className={clsx(
          "bg-(--light) shadow-neutral-400/30 shadow-xl p-0 rounded-[20px] overflow-hidden",
          !hasIcon && "mt-4"
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
          {!isLoading && data.length === 0 && (
            <li className="flex justify-center p-4 text-center">
              {t("empty")}
            </li>
          )}
          {!isLoading &&
            data.length > 0 &&
            data.map(({ id, content }) => (
              <li
                key={id}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleValue(content);
                }}
                className={clsx(
                  "hover:bg-(--brown)/20 p-2 text-center cursor-pointer",
                  content === value && "!bg-(--brown)"
                )}
              >
                {v.titleCase(
                  type === "property"
                    ? t(`properties.${id as PropertyIdType}`)
                    : content
                )}
              </li>
            ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
}
