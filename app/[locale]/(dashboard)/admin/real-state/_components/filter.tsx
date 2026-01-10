"use client";

import { Combobox } from "@/components/combobox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ListFilterPlusIcon,
  PlusIcon,
  SearchIcon,
  TextSearchIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import ActionModal from "./action-modal";
import FiltersForm from "./filters-form";
import FiltersBadge from "./filters-badge";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";
import Link from "next/link";
import { Table } from "@tanstack/react-table";
import { FilterState, FiltersType, PlaceType, RealStateType } from "@/lib/type";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { filters } from "@/actions/filters";
import v from "voca";

type FilterProps = {
  table: Table<RealStateType>;
  isPending: boolean;
};

export default function Filter({ table, isPending }: FilterProps) {
  const { getPath } = useLocalizedPath();
  const [open, setOpen] = useState(false);
  const [cities, setCities] = useState<PlaceType[]>([]);
  const [areas, setAreas] = useState<PlaceType[]>([]);
  const [filter, setFilter] = useState<FilterState>({
    search: "",
    city: "",
    area: "",
    property: "",
    category: "",
    bedroom: "",
    bathroom: "",
    price: "",
    view: "",
    criteria: {
      garden: undefined,
      furnished: undefined,
      pool: undefined,
      terrace: undefined,
      gym: undefined,
      generator: undefined,
    },
  });

  const query: UseQueryResult<FiltersType, Error> = useQuery({
    queryKey: ["filters"],
    queryFn: () => filters(),
  });

  useEffect(() => {
    if (query.data?.cities) {
      setCities([
        ...query.data.cities.map((f, index) => ({
          id: index,
          label: v.titleCase(f.name),
          value: f.name,
        })),
      ]);
    }
  }, [query.data?.cities]);

  useEffect(() => {
    if (!filter.city) {
      setAreas([]);
      return;
    }
    if (filter.city && query.data?.areas) {
      const filteredAreas = query.data.areas
        .filter(
          (area) => area.city.toLowerCase() === filter.city?.toLowerCase()
        )
        .map((area, index) => ({
          id: index,
          label: v.titleCase(area.name),
          value: area.name,
        }));
      setAreas(filteredAreas);
    }
  }, [filter.city, query.data?.areas]);

  function updateFilter(key: keyof FilterState, value: boolean | string) {
    setFilter((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function updateCriteria(
    criteriaKey: keyof FilterState["criteria"],
    value: boolean
  ) {
    setFilter((prev) => ({
      ...prev,
      criteria: {
        ...prev.criteria,
        [criteriaKey]: value,
      },
    }));
  }

  function clearFilter(key: keyof FilterState) {
    if (key === "criteria") {
      setFilter((prev) => ({
        ...prev,
        criteria: {
          garden: false,
          pool: false,
          furnished: false,
          terrace: false,
          gym: false,
          generator: false,
        },
      }));
    } else {
      setFilter((prev) => ({
        ...prev,
        [key]: "",
      }));
    }
  }

  function submit(e: React.SyntheticEvent) {
    e.preventDefault();
    table.getColumn("title")?.setFilterValue(filter.search);
    table.getColumn("city")?.setFilterValue(filter.city);
    table.getColumn("area")?.setFilterValue(filter.area);
    table.getColumn("property")?.setFilterValue(filter.property);
    table.getColumn("status")?.setFilterValue(filter.category);
    table
      .getColumn("bedroom")
      ?.setFilterValue(filter.bedroom === "+5" ? "6" : filter.bedroom);
    table
      .getColumn("bathroom")
      ?.setFilterValue(filter.bathroom === "+5" ? "6" : filter.bathroom);
    table.getColumn("price")?.setFilterValue(filter.price?.replace(/\s+/g, ""));
    table.getColumn("view")?.setFilterValue(filter.view);

    filter.criteria.garden
      ? table.getColumn("garden")?.setFilterValue(filter.criteria.garden)
      : table.getColumn("garden")?.setFilterValue(undefined);
    filter.criteria.generator
      ? table.getColumn("generator")?.setFilterValue(filter.criteria.generator)
      : table.getColumn("generator")?.setFilterValue(undefined);
    filter.criteria.gym
      ? table.getColumn("gym")?.setFilterValue(filter.criteria.gym)
      : table.getColumn("gym")?.setFilterValue(undefined);
    filter.criteria.pool
      ? table.getColumn("pool")?.setFilterValue(filter.criteria.pool)
      : table.getColumn("pool")?.setFilterValue(undefined);
    filter.criteria.terrace
      ? table.getColumn("terrace")?.setFilterValue(filter.criteria.terrace)
      : table.getColumn("terrace")?.setFilterValue(undefined);
    filter.criteria.furnished
      ? table.getColumn("furnished")?.setFilterValue(filter.criteria.furnished)
      : table.getColumn("furnished")?.setFilterValue(undefined);
  }

  return (
    <>
      <div className="space-y-3">
        <div className="justify-between items-center gap-2 grid grid-cols-1">
          <div className="gap-x-2 grid grid-cols-1 sm:grid-cols-[1fr_120px]">
            <div className="relative w-full max-w-full">
              <span className="top-1/2 left-3 absolute text-neutral-400 -translate-y-1/2">
                <SearchIcon size={15} />{" "}
              </span>
              <Input
                onChange={(e) => updateFilter("search", e.target.value)}
                placeholder="Ex:..Villa splendide"
                className="bg-background shadow-xs pl-8 border focus-visible:border-ring border-border rounded-md outline-none focus-visible:ring-(--bright-green)/50 h-9 placeholder:text-neutral-500 text-sm"
              />
            </div>
            <Button
              disabled={isPending}
              variant="slider"
              onClick={submit}
              className="hidden sm:flex bg-(--bright-green) shadow-none rounded-md w-full h-9 text-(--light)"
            >
              <TextSearchIcon size={15} /> Filtrer
            </Button>
          </div>

          <div className="flex flex-col gap-2 sm:grid grid-cols-2">
            <Combobox
              datas={cities}
              value={filter.city ?? ""}
              setValue={(value) => updateFilter("city", value as string)}
              placeholder="Ex: Pointe-Noire"
              emptyText="Rechercher une ville"
              notFoundText="Aucune ville trouvé."
            />
            <div className="gap-2 grid grid-cols-[1fr_50px]">
              <Combobox
                datas={areas}
                value={filter.area ?? ""}
                setValue={(value) => updateFilter("area", value as string)}
                placeholder="Ex: Aéroport"
                emptyText="Rechercher un quartier"
                notFoundText="Aucun quartier trouvé."
              />

              <ActionModal
                open={open}
                setOpen={setOpen}
                title="Filtres"
                maxHeight="!max-h-[520px]"
                action={
                  <Button variant="outline" className="h-10">
                    <ListFilterPlusIcon size={15} />
                  </Button>
                }
              >
                <FiltersForm
                  updateCriteria={updateCriteria}
                  updateFilter={updateFilter}
                  filters={filter}
                />
              </ActionModal>
            </div>
          </div>
          <Button
            variant="slider"
            onClick={submit}
            disabled={isPending}
            className="sm:hidden flex bg-(--bright-green) shadow-none rounded-md w-full h-9 text-(--light)"
          >
            <TextSearchIcon size={15} /> Filtrer
          </Button>
        </div>
        <FiltersBadge
          filters={filter}
          clearFilter={clearFilter}
          updateCriteria={updateCriteria}
        />
      </div>
      <div className="flex justify-end">
        <Link href={getPath("/admin/real-state/add")}>
          <Button
            variant="slider"
            className="shadow-none rounded-md w-full max-w-[200px] text-(--light)"
          >
            <PlusIcon /> Nouvelle maison
          </Button>
        </Link>
      </div>
    </>
  );
}
