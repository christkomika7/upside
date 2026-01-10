"use client";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import clsx from "clsx";
import { ChevronDownIcon } from "lucide-react";
import { useEffect, useState } from "react";

type InputSelectType = {
  placeholder: string;
  className?: string;
  suffix?: string;
  data?: {
    id: string;
    content: string;
  }[];
  addData?: React.Dispatch<React.SetStateAction<string>>;
  hasIcon?: boolean;
  hasError?: boolean;
};

export default function InputSelect({
  placeholder,
  className,
  addData,
  data = [],
  hasIcon = true,
  hasError = false,
  suffix,
}: InputSelectType) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    if (addData) {
      addData(value);
    }
  }, [value]);

  function handleValue(v: string) {
    if (v === value) {
      setValue(placeholder);
    } else {
      setValue(v);
    }
    setOpen(false);
  }
  return (
    <Popover open={open} onOpenChange={(e) => setOpen(e)}>
      <PopoverTrigger asChild>
        <Button
          variant="select"
          className={clsx(
            "h-[50px]",
            className,
            !hasIcon &&
              " bg-(--light) justify-center sm:justify-start w-full sm:w-fit sm:bg-transparent hover:!bg-(--brown)/20",
            !hasIcon &&
              value !== "" &&
              value !== placeholder &&
              "!bg-(--brown)",
            hasError && "border-2 border-destructive"
          )}
        >
          <span className={clsx(hasError && "text-destructive")}>
            {value
              ? `${value} ${suffix && value !== placeholder ? suffix : ""}`
              : placeholder}
          </span>
          {hasIcon && (
            <span>
              <ChevronDownIcon size={25} />
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={clsx(
          "bg-(--light) shadow-neutral-400/30 shadow-xl p-0 rounded-[20px] w-[268px] overflow-hidden",
          !hasIcon && "mt-4"
        )}
      >
        <ul className="font-medium text-(--deep-dark)">
          {data.length > 0 &&
            data.map((d) => (
              <li
                key={d.id}
                onClick={() => handleValue(d.content)}
                className={clsx(
                  "hover:bg-(--brown)/20 p-2 text-center cursor-pointer",
                  d.content === value && "!bg-(--brown)"
                )}
              >
                {d.content}
              </li>
            ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
}
