import clsx from "clsx";
import React from "react";
import { Checkbox } from "../ui/checkbox";

type CheckInputProps = {
  placeholder: string;
  setValue: React.Dispatch<React.SetStateAction<boolean>>;
  value: boolean;
};

export default function CheckInput({
  placeholder,
  setValue,
  value,
}: CheckInputProps) {
  return (
    <label
      htmlFor={placeholder}
      className={clsx(
        "flex items-center gap-x-3 hover:bg-(--brown)/30 px-2 sm:px-6 py-4 rounded-full font-medium text-(--deep-dark) cursor-pointer",
        value && "!bg-(--brown)"
      )}
    >
      <Checkbox
        id={placeholder}
        className="border-(--deep-dark) w-5 h-5"
        checked={value}
        onCheckedChange={(e) => setValue(e as boolean)}
      />
      {placeholder}
    </label>
  );
}
