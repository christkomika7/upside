"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import clsx from "clsx";
import { ChevronDownIcon } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

type PropertySelectType = {
  placeholder: string;
  className?: string;
  data?: {
    id: string;
    content: string;
  }[];
  defaultValue?: string;
  addData?: React.Dispatch<React.SetStateAction<string>>;
  hasIcon?: boolean;
  suffix?: string;
};

export default function PropertySelect({
  placeholder,
  className,
  addData,
  suffix,
  data = [],
  defaultValue,
  hasIcon = true,
}: PropertySelectType) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(() => (defaultValue ? defaultValue : ""));

  const displayText = useMemo(() => {
    if (value) return `${value} ${suffix}${Number(value) !== 1 ? "s" : ""}`;
    return placeholder;
  }, [value, placeholder]);

  const handleValue = useCallback((newValue: string) => {
    setValue((current) => (current === newValue ? "" : newValue));
    setOpen(false);
  }, []);

  useEffect(() => {
    if (addData) {
      addData(value);
    }
  }, [value, addData]);

  useEffect(() => {
    if (defaultValue && defaultValue !== value) {
      setValue(defaultValue);
    }
  }, [defaultValue]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="select"
          className={clsx(
            "h-[50px]",
            className,
            !hasIcon &&
              "bg-(--light) justify-center sm:justify-start w-full sm:w-fit sm:bg-transparent hover:!bg-(--brown)/20",
            !hasIcon && value && value !== placeholder && "!bg-(--brown)"
          )}
        >
          <span>{displayText}</span>
          {hasIcon && <ChevronDownIcon size={25} aria-hidden="true" />}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={clsx(
          "bg-(--light) shadow-neutral-400/30 shadow-xl p-0 rounded-[20px] w-[268px] overflow-hidden",
          !hasIcon && "mt-4"
        )}
      >
        {data.length > 0 ? (
          <ul className="font-medium text-(--deep-dark)">
            {data.map((item) => (
              <li
                key={item.id}
                onClick={(e) => {
                  e.preventDefault();
                  handleValue(item.content);
                }}
                className={clsx(
                  "hover:bg-(--brown)/20 p-2 text-center transition-colors cursor-pointer",
                  item.content === value && "!bg-(--brown)"
                )}
              >
                {`${item.content} ${suffix}${
                  Number(item.content) !== 1 ? "s" : ""
                }`}
              </li>
            ))}
          </ul>
        ) : (
          <div className="p-4 text-gray-500 text-center">
            Aucune donnée disponible
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
