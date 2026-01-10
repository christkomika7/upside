"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { XIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import clsx from "clsx";
import { useScopedI18n } from "@/locales/client";
import useFilters from "@/stores/useFilters";
import { rubik } from "@/font/font";
import { useWidth } from "@/hooks/useWidth";
import {
  bathrooms,
  bedrooms,
  housePriceRange,
  houseView,
} from "@/data/product";
import SelectFilter from "../form/select-filter";
import CheckInput from "../form/check-input";
import SelectViewFilter from "../form/select-view-filter";
import { BedIcon, BathIcon } from "../ui/icon";

export default function FilterModal() {
  const [open, setOpen] = useState(false);
  const width = useWidth();
  const setFilter = useFilters.use.setFilter();
  const price = useFilters.use.price();
  const bedroom = useFilters.use.bedroom();
  const bathroom = useFilters.use.bathroom();
  const garden = useFilters.use.garden();
  const pool = useFilters.use.pool();
  const view = useFilters.use.view();
  const furnished = useFilters.use.furnished();
  const terrace = useFilters.use.terrance();
  const gym = useFilters.use.gym();
  const generator = useFilters.use.generator();
  const hasData = useFilters.use.isSelectedValue();
  const t = useScopedI18n("filter");
  const ta = useScopedI18n("action");

  return (
    <Dialog open={open} onOpenChange={(e) => setOpen(e)}>
      <DialogTrigger asChild>
        <span
          className={clsx(
            "group flex items-center hover:bg-(--brown)/20 rounded-full h-full font-medium text-sm cursor-pointer",
            rubik.className,
            hasData() && "!bg-(--brown)",
            width < 1024 && price && "!bg-(--brown)",
            width < 900 && bedroom && "!bg-(--brown)",
            width < 900 && bathroom && "!bg-(--brown)"
          )}
        >
          <span className={clsx("flex px-6 py-3")}>{t("more")}</span>
        </span>
      </DialogTrigger>
      <DialogContent className="gap-1 space-y-1 bg-transparent px-1 py-0 border-none max-w-3xl">
        <DialogHeader className="flex flex-row justify-end gap-0 w-full">
          <Button
            onClick={() => setOpen(false)}
            variant="close"
            className="h-[43px]"
          >
            <XIcon size={15} /> {ta("close")}
          </Button>
        </DialogHeader>
        <div className="bg-(--light) shadow-neutral-400/30 shadow-xl rounded-[32px] overflow-hidden">
          <div className="space-y-3 p-4 md:p-9">
            <DialogTitle></DialogTitle>
            <DialogDescription></DialogDescription>

            <div className="ms:hidden justify-between gap-x-6 gap-y-2 grid grid-cols-1 sm:grid-cols-2 mx-auto">
              <SelectFilter
                placeholder={t("bedroom")}
                items={bedrooms}
                value={bedroom}
                className="py-4 !border-none"
                hasBackground
                showValue
                suffix={t("bedroom_placeholder")}
                setValue={(e) => setFilter("bedroom", e as string)}
                hasIcon={
                  <span className="flex mr-2 w-5 h-5">
                    <BedIcon className="fill-(--deep-dark)" />
                  </span>
                }
              />
              <SelectFilter
                placeholder={t("bathroom")}
                items={bathrooms}
                value={bathroom}
                hasBackground
                className="py-4 !border-none"
                showValue
                suffix={t("bathroom_placeholder")}
                hasIcon={
                  <span className="flex mr-2 w-5 h-5">
                    <BathIcon className="fill-(--deep-dark)" />
                  </span>
                }
                setValue={(e) => setFilter("bathroom", e as string)}
              />
            </div>
            <div className="gap-x-6 gap-y-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 mx-auto">
              <SelectViewFilter
                placeholder={t("view")}
                items={houseView}
                value={view}
                className="py-4 !border-none"
                showValue
                hasBackground
                setValue={(e) => setFilter("view", e as string)}
              />
              <div className="lg:hidden block">
                <SelectFilter
                  placeholder={t("price")}
                  items={housePriceRange}
                  value={price}
                  hasBackground
                  className="py-4 !border-none"
                  showValue
                  suffix="XAF"
                  setValue={(e) => setFilter("price", e as string)}
                />
              </div>
            </div>
            <div className="space-y-2 bg-(--brown)/10 mx-auto p-2 sm:p-4 rounded-[32px]">
              <h2
                className={clsx(
                  "px-3 sm:px-6 rounded-full font-semibold text-(--deep-dark) text-lg",
                  rubik.className
                )}
              >
                {t("other")}
              </h2>
              <div className="justify-center gap-2 grid grid-cols-2 sm:grid-cols-3">
                <CheckInput
                  placeholder={t("garden")}
                  value={garden}
                  setValue={(e) => setFilter("garden", e)}
                />
                <CheckInput
                  placeholder={t("pool")}
                  value={pool}
                  setValue={(e) => setFilter("pool", e)}
                />
                <CheckInput
                  placeholder={t("furnished")}
                  value={furnished}
                  setValue={(e) => setFilter("furnished", e)}
                />
                <CheckInput
                  placeholder={t("terrace")}
                  value={terrace}
                  setValue={(e) => setFilter("terrance", e)}
                />
                <CheckInput
                  placeholder={t("gym")}
                  value={gym}
                  setValue={(e) => setFilter("gym", e)}
                />
                <CheckInput
                  placeholder={t("generator")}
                  value={generator}
                  setValue={(e) => setFilter("generator", e)}
                />
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
