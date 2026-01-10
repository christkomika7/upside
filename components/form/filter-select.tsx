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

type FilterSelectType = {
  placeholder: string;
  items: { id: string; content: string }[];
  setValue: React.Dispatch<React.SetStateAction<string>>;
  value: string;
  type?: string;
  hasIcon?: boolean;
  className?: string;
};

export default function FilterSelect({
  placeholder,
  value,
  items = [],
  setValue,
  type,
  hasIcon,
  className,
}: FilterSelectType) {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={(e) => setOpen(e)}>
      <PopoverTrigger asChild>
        <Button
          variant="select"
          className={clsx(
            "h-[50px]",
            !hasIcon &&
              "!bg-(--light) justify-center sm:justify-start w-full sm:w-fit sm:bg-transparent hover:!bg-(--brown)/20",
            !hasIcon && value !== "" && value !== placeholder && "!bg-(--brown)"
          )}
        >
          <span className="">{value ? value : placeholder}</span>
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
                {content}
              </li>
            ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
}
