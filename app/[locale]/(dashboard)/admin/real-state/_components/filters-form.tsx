import { Combobox } from "@/components/combobox";
import { filtersData } from "./data";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import clsx from "clsx";
import { FilterState } from "@/lib/type";

type FiltersFormProps = {
  filters: FilterState;
  updateCriteria(
    criteriaKey: keyof FilterState["criteria"],
    value: boolean
  ): void;
  updateFilter(key: keyof FilterState, value: boolean | string): void;
};

export default function FiltersForm({
  filters,
  updateCriteria,
  updateFilter,
}: FiltersFormProps) {
  return (
    <div className="space-y-4 w-full max-w-2xl">
      <div className="gap-2 sm:gap-4 grid grid-cols-1 sm:grid-cols-2">
        <Combobox
          datas={filtersData.properties}
          value={filters.property ?? ""}
          setValue={(value) => {
            updateFilter("property", value as string);
          }}
          placeholder="Ex:..Villa"
          emptyText="Type de proprieté"
          notFoundText="Aucune propriété trouvée."
        />
        <Combobox
          datas={filtersData.categories}
          value={filters.category ?? ""}
          setValue={(value) => updateFilter("category", value as string)}
          placeholder="Ex:..Louer"
          emptyText="Statut"
          notFoundText="Aucun statut trouvé."
        />
        <Combobox
          datas={filtersData.bedrooms}
          value={filters.bedroom ?? ""}
          setValue={(value) => updateFilter("bedroom", value as string)}
          placeholder="Ex:..3"
          emptyText="Nombre de chambre"
          notFoundText="Aucun nombre trouvé."
        />
        <Combobox
          datas={filtersData.bathrooms}
          value={filters.bathroom ?? ""}
          setValue={(value) => updateFilter("bathroom", value as string)}
          placeholder="Ex:..1 "
          emptyText="Nombre de douche"
          notFoundText="Aucune douche trouvée."
        />
      </div>
      <div className="grid grid-cols-1">
        <Combobox
          datas={filtersData.views}
          value={filters.view ?? ""}
          setValue={(value) => updateFilter("view", value as string)}
          placeholder="Ex:..1 "
          emptyText="Type de vue"
          notFoundText="Aucune vue trouvée."
        />
      </div>
      <div className="grid grid-cols-1">
        <Combobox
          datas={filtersData.prices}
          value={filters.price ?? ""}
          setValue={(value) => {
            console.log({ value });
            updateFilter("price", value as string);
          }}
          placeholder="Ex:..100 000 - 500 000"
          emptyText="Tranche de prix"
          notFoundText="Aucun prix trouvé."
        />
      </div>
      <div className="space-y-3">
        <h3 className="font-medium text-neutral-500 text-sm">Critères</h3>
        <div className="gap-3 grid grid-cols-2">
          {filtersData.criteria.map((item) => (
            <Label
              key={item.id}
              htmlFor={item.id}
              className={clsx(
                "flex items-center space-x-2 hover:bg-(--brown)/20 p-3 rounded-full cursor-pointer",
                !!filters.criteria[item.id as keyof typeof filters.criteria] &&
                  "!bg-(--brown)"
              )}
              onClick={(e) => {
                e.preventDefault();
                updateCriteria(
                  item.id as keyof typeof filters.criteria,
                  !filters.criteria[item.id as keyof typeof filters.criteria]
                );
              }}
            >
              <Checkbox
                checked={
                  !!filters.criteria[item.id as keyof typeof filters.criteria]
                }
                id={item.id}
                className="border-neutral-400"
              />
              <p>{item.content}</p>
            </Label>
          ))}
        </div>
      </div>
    </div>
  );
}
