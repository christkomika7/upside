import { bathrooms, bedrooms } from "@/data/product";
import { useScopedI18n } from "@/locales/client";
import SelectFilter from "../form/select-filter";
import CheckInput from "../form/check-input";
import useHeroFilters from "@/stores/useHeroFilters";
import { BathIcon, BedIcon } from "../ui/icon";
import clsx from "clsx";
import { rubik } from "@/font/font";
import { XIcon } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

type MoreFilterProps = {
  setState: Dispatch<SetStateAction<number>>;
};

export default function MoreFilter({ setState }: MoreFilterProps) {
  const t = useScopedI18n("home.filter");
  const bedroom = useHeroFilters.use.bedroom();
  const bathroom = useHeroFilters.use.bathroom();
  const garden = useHeroFilters.use.garden();
  const pool = useHeroFilters.use.pool();
  const furnished = useHeroFilters.use.furnished();
  const terrace = useHeroFilters.use.terrance();
  const gym = useHeroFilters.use.gym();
  const generator = useHeroFilters.use.generator();
  const setFilter = useHeroFilters.use.setFilter();

  function close() {
    setState(0);
  }

  return (
    <div className="space-y-3 p-3 md:p-5 w-full">
      <div className="flex justify-end mt-2">
        <span
          onClick={close}
          className="flex justify-center items-center bg-(--brown)/15 rounded-full w-5 h-5 cursor-pointer"
        >
          <XIcon size={14} />
        </span>
      </div>
      <div className="justify-between gap-x-6 gap-y-2 grid grid-cols-1 sm:grid-cols-2 mx-auto">
        <SelectFilter
          placeholder={t("bedroom")}
          items={bedrooms}
          value={bedroom}
          className="bg-transparent py-4 border-neutral-300 border-y border-none rounded-none w-full max-w-full"
          showValue
          suffix={t("bedroom")}
          setValue={(e) => setFilter("bedroom", e as string)}
          hasBackground
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
          className="bg-transparent py-4 border-neutral-300 border-y border-none rounded-none w-full max-w-full"
          showValue
          suffix={t("bathroom")}
          setValue={(e) => setFilter("bathroom", e as string)}
          hasBackground
          hasIcon={
            <span className="flex mr-2 w-5 h-5">
              <BathIcon className="fill-(--deep-dark)" />
            </span>
          }
        />
      </div>
      <div className="space-y-2 bg-(--brown)/10 mx-auto p-2 sm:p-4 rounded-[32px]">
        <h2
          className={clsx(
            "px-3 sm:px-7 rounded-full font-semibold text-(--deep-dark) text-lg",
            rubik.className,
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
  );
}
