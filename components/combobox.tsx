"use client";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import clsx from "clsx";
import { Spinner } from "./ui/spinner";

type ComboboxProps = {
  datas: { id: string | number; value: string; label: string }[];
  placeholder: string;
  emptyText: string;
  notFoundText: string;
  setValue: Dispatch<SetStateAction<string>>;
  value: string;
  error?: boolean;
  isDisabled?: boolean;
  isPending?: boolean;
};

export function Combobox({
  datas,
  placeholder,
  emptyText,
  notFoundText,
  value,
  setValue,
  error,
  isDisabled,
  isPending,
}: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          ref={buttonRef}
          variant="outline"
          role="combobox"
          disabled={isDisabled}
          aria-expanded={open}
          className={clsx(
            "justify-between w-full h-10",
            error && "border border-destructive"
          )}
        >
          {value && value !== "0"
            ? datas.find((data) => data.label === value)?.label
            : emptyText}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="p-0 w-full"
        style={{ width: buttonRef.current?.clientWidth }}
      >
        <Command>
          <CommandInput placeholder={placeholder} className="h-9" />
          <CommandList>
            <CommandEmpty>
              {isPending ? (
                <span className="flex justify-center">
                  <Spinner className="w-4 h-4 text-neutral-700" />
                </span>
              ) : (
                <span>{notFoundText}</span>
              )}
            </CommandEmpty>
            <CommandGroup>
              {datas.map((data) => (
                <CommandItem
                  key={data.id}
                  value={data.label}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {data.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === data.label ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
