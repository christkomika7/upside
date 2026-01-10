"use client";
import { housePriceRange } from "@/data/product";
import clsx from "clsx";
import { Checkbox } from "../ui/checkbox";
import { useScopedI18n } from "@/locales/client";
import useRentFilter from "@/stores/useRentFilter";
import { Dispatch, SetStateAction } from "react";

type RentPriceFilterProps = {
  setState: Dispatch<SetStateAction<number>>;
};

export default function RentPriceFilter({ setState }: RentPriceFilterProps) {
  const price = useRentFilter.use.price();
  const setFilter = useRentFilter.use.setFilter();
  const t = useScopedI18n("home.filter");

  function handlePriceRange(value: string) {
    if (value === price) setFilter("price", "");
    else setFilter("price", value);
    setState(0);
  }
  return (
    <ul>
      {housePriceRange.map((priceRange) => (
        <li key={priceRange.id}>
          <label
            htmlFor={priceRange.id}
            className={clsx(
              "flex items-center gap-x-3 hover:bg-(--brown)/20 backdrop-blur-2xl px-6 py-4 text-(--deep-dark) cursor-pointer",
              priceRange.content === price && "!bg-(--brown)"
            )}
            onClick={(e) => {
              e.preventDefault();
              handlePriceRange(priceRange.content);
            }}
          >
            <Checkbox
              id={priceRange.id}
              className="border-(--deep-dark) w-5 h-5"
              checked={priceRange.content === price}
            />
            {priceRange.content === "Sans prix"
              ? t("noPrice")
              : priceRange.content + " " + t("currency")}
          </label>
        </li>
      ))}
    </ul>
  );
}
