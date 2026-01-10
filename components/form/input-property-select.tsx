"use client";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PropertyIdType } from "@/data";
import { TotalPropertyIdType } from "@/lib/type";
import { useScopedI18n } from "@/locales/client";
import clsx from "clsx";
import { ChevronDownIcon } from "lucide-react";
import { useEffect, useState } from "react";

type InputPropertySelectType = {
  placeholder: string;
  className?: string;
  data?: {
    id: TotalPropertyIdType;
    content: string;
  }[];
  addData?: React.Dispatch<React.SetStateAction<string>>;
  hasIcon?: boolean;
  hasError?: boolean;
};

export default function InputPropertySelect({
  placeholder,
  className,
  addData,
  data = [],
  hasIcon = true,
  hasError = false,
}: InputPropertySelectType) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const t = useScopedI18n("management.contact.form.properties");

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

  function getStatusId(content: string): TotalPropertyIdType {
    const id = data.find((d) => d.content === content)?.id;
    return id as TotalPropertyIdType;
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
            hasError && "border-2 border-destructive",
          )}
        >
          <span className={clsx(hasError && "text-destructive")}>
            {value && value !== placeholder
              ? t(getStatusId(value))
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
          !hasIcon && "mt-4",
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
                  d.content === value && "!bg-(--brown)",
                )}
              >
                {t(d.id)}
              </li>
            ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
}
