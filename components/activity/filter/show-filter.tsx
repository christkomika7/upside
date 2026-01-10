"use client";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { orders, OrderTypeIdType } from "@/data";
import { SearchEditNuqsFilterType, SearchNuqsFilterType } from "@/lib/type";
import { getLocalOrderType } from "@/lib/utils";
import { useScopedI18n } from "@/locales/client";
import clsx from "clsx";
import { ChevronDownIcon } from "lucide-react";
import { useRef, useState } from "react";

type ShowFilterProps = {
  section: "buy" | "rent";
  setHouseFilter: SearchEditNuqsFilterType;
  houseFilter: SearchNuqsFilterType;
};

export default function ShowFilter({
  section,
  setHouseFilter,
  houseFilter,
}: ShowFilterProps) {
  const [order, setOrder] = useState("");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLButtonElement>(null);
  const t = useScopedI18n(`${section}.product.button`);

  function handleOrder(v: string) {
    const current =
      v === "Ascending price"
        ? "asc"
        : v === "Descending price"
          ? "desc"
          : v === "Oldest to newest"
            ? "oldest"
            : undefined;
    if (v === order) {
      setOrder("");
      setHouseFilter({
        ...houseFilter,
        filter: undefined,
      });
      return setOpen(false);
    }
    setHouseFilter({
      ...houseFilter,
      filter: current,
    });
    setOrder(v);
    setOpen(false);
  }

  return (
    <Popover open={open} onOpenChange={(e) => setOpen(e)}>
      <PopoverTrigger asChild>
        <Button
          ref={containerRef}
          variant="filter"
          className="h-[45px] w-full sm:w-fit"
        >
          {order ? (
            t(`sorting.list.${getLocalOrderType(order) as OrderTypeIdType}`)
          ) : (
            <>
              <span className="text-neutral-600">
                {t("sorting.placeholder")}
              </span>
            </>
          )}
          <span>
            <ChevronDownIcon size={25} />
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="bg-(--brown) shadow-neutral-400/30 shadow-xl p-0 rounded-[28px]"
        style={{
          width: containerRef.current?.clientWidth,
        }}
      >
        <ul className="font-medium text-(--deep-dark)">
          {orders.map((v) => (
            <li
              onClick={() => handleOrder(v.content)}
              key={v.id}
              className={clsx(
                "hover:bg-white/10 p-2 text-base text-center cursor-pointer",
                v.content === order && "!bg-white/30",
              )}
            >
              {t(`sorting.list.${v.id}`)}
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
}
