import { housePropertiesType } from "@/data/product";
import { PropoertyIdType } from "@/lib/type";
import { useScopedI18n } from "@/locales/client";
import useHeroFilters from "@/stores/useHeroFilters";
import clsx from "clsx";
import { Dispatch, SetStateAction } from "react";

type PropertyFilterProps = {
  setState: Dispatch<SetStateAction<number>>;
};

export default function PropertyFilter({ setState }: PropertyFilterProps) {
  const property = useHeroFilters.use.property();
  const setFilter = useHeroFilters.use.setFilter();
  const t = useScopedI18n("home.filter.properties");

  function handleProperty(value: string) {
    if (value === property) setFilter("property", "");
    else setFilter("property", value);
    setState(0);
  }

  return (
    <ul>
      {housePropertiesType.map((p) => (
        <li
          key={p.id}
          onClick={(e) => {
            e.preventDefault();
            handleProperty(p.content);
          }}
          className={clsx(
            "flex items-center gap-x-3 hover:bg-(--brown)/20 backdrop-blur-2xl px-6 py-4 text-(--deep-dark) cursor-pointer",
            p.content === property && "!bg-(--brown)"
          )}
        >
          <span className="flex w-6 h-6">{<p.icon />}</span>
          {t(p.id as PropoertyIdType)}
        </li>
      ))}
    </ul>
  );
}
