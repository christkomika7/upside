"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import BuyFilter from "./buy-filter";
import RentFilter from "./rent-filter";
import { useScopedI18n } from "@/locales/client";
import useActualize from "@/stores/useActualize";
import clsx from "clsx";
import useHeroFilters from "@/stores/useHeroFilters";
import { useState } from "react";
import useRentFilter from "@/stores/useRentFilter";

export default function Filter() {
  const [status, setStatus] = useState<"buy" | "rent">("buy");
  const clearBuy = useHeroFilters.use.clear();
  const clearRent = useRentFilter.use.clear();
  const t = useScopedI18n("home.filter");
  const state = useActualize.use.state();

  function handleFilter(type: "buy" | "rent") {
    clearBuy();
    clearRent();
    setStatus(type);
  }

  return (
    <div
      className={clsx(
        "bg-neutral-200/20 backdrop-blur-xl px-3 sm:px-6 py-6 rounded-[42px] w-full max-w-4xl h-auto min-h-[178px]",
        state > 0 ? "mb-16 sm:mb-20  md:mb-24" : "mb-16"
      )}
    >
      <Tabs defaultValue="buy" className="mx-auto w-full">
        <TabsList className="mx-auto mb-[22px]">
          <TabsTrigger value="buy" onClick={() => handleFilter("buy")}>
            {t("buy")}
          </TabsTrigger>
          <TabsTrigger value="rent" onClick={() => handleFilter("rent")}>
            {t("rent")}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="buy">
          <BuyFilter status={status} />
        </TabsContent>
        <TabsContent value="rent">
          <RentFilter status={status} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
