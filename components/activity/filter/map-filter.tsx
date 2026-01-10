import { Button } from "@/components/ui/button";
import { useScopedI18n } from "@/locales/client";
import { ChevronRightIcon, MapPinIcon } from "lucide-react";
import React from "react";
import MapModal from "../map-modal";
import { RealStateType } from "@/lib/type";

type MapFilterProps = {
  section: "buy" | "rent";
  datas: RealStateType[];
};

export default function MapFilter({ section, datas }: MapFilterProps) {
  const t = useScopedI18n(`${section}.product.button`);
  return (
    <MapModal datas={datas}>
      <Button variant="filter" className="hidden sm:flex h-[45px]">
        <span className="text-neutral-800">
          <MapPinIcon />
        </span>
        <span className="font-medium">{t("map")}</span>
        <span>
          <ChevronRightIcon size={25} />
        </span>
      </Button>
    </MapModal>
  );
}
