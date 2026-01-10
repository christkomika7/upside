"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import useFilters from "@/stores/useFilters";
import {
  bathrooms,
  bedrooms,
  housePriceRange,
  housePropertiesType,
} from "@/data/product";
import FilterModal from "../filter-modal";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import {
  ClientPlaceType,
  FiltersType,
  SearchEditNuqsFilterType,
  SearchNuqsFilterType,
} from "@/lib/type";
import { filters } from "@/actions/filters";
import { useScopedI18n } from "@/locales/client";
import { Spinner } from "@/components/ui/spinner";
import SelectFilter from "@/components/form/select-filter";
import { SearchIcon, XIcon } from "lucide-react";

type FiltersProps = {
  searchHouseFilter: SearchEditNuqsFilterType;
  isLoading: boolean;
};

export default function Filters({
  searchHouseFilter,
  isLoading,
}: FiltersProps) {
  const setFilter = useFilters.use.setFilter();
  const property = useFilters.use.property();
  const city = useFilters.use.city();
  const area = useFilters.use.district();
  const bedroom = useFilters.use.bedroom();
  const bathroom = useFilters.use.bathroom();
  const price = useFilters.use.price();
  const garden = useFilters.use.garden();
  const pool = useFilters.use.pool();
  const furnished = useFilters.use.furnished();
  const view = useFilters.use.view();
  const terrace = useFilters.use.terrance();
  const gym = useFilters.use.gym();
  const hasData = useFilters.use.hasData();
  const generator = useFilters.use.generator();
  const empty = useFilters.use.clear();
  const [cityList, setCityList] = useState<ClientPlaceType[]>([]);
  const [areaList, setAreaList] = useState<ClientPlaceType[]>([]);
  const t = useScopedI18n("filter");
  const ta = useScopedI18n("action");

  const query: UseQueryResult<FiltersType, Error> = useQuery({
    queryKey: ["filters"],
    queryFn: () => filters(),
  });

  useEffect(() => {
    if (query.data?.cities) {
      setCityList([
        ...query.data.cities.map((f, index) => ({
          id: index.toString(),
          content: f.name,
        })),
      ]);
    }
  }, [query.data?.cities]);

  useEffect(() => {
    if (!city) {
      setAreaList([]);
      return;
    }
    if (city && query.data?.areas) {
      const filteredAreas = query.data.areas
        .filter((area) => area.city.toLowerCase() === city?.toLowerCase())
        .map((area, index) => ({
          id: index.toString(),
          content: area.name,
        }));
      setAreaList(filteredAreas);
    }
  }, [city, query.data?.areas]);

  useEffect(() => {
    if (city === "" || city === t("city")) {
      setFilter("district", "");
    }
  }, [city]);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    searchHouseFilter({
      property,
      city,
      area,
      bedroom,
      bathroom,
      price: price === "Sans prix" ? "noprice" : price,
      garden,
      furnished,
      view,
      pool,
      generator,
      gym,
      terrace,
    });
  };

  function clear() {
    empty();
    searchHouseFilter({
      pageIndex: 1,
      property: "",
      city: "",
      area: "",
      bedroom: "",
      bathroom: "",
      price: "",
      view: "",
      garden: false,
      furnished: false,
      pool: false,
      generator: false,
      gym: false,
      terrace: false,
    });
  }

  return (
    <div className="relative bg-(--blue-light) backdrop-blur-lg p-4 rounded-[32px] md:rounded-full w-full">
      {hasData() && (
        <span
          onClick={clear}
          className="md:hidden -bottom-[30px] left-1/2 absolute flex justify-center items-center gap-x-1 bg-(--brown)/40 px-2 py-1 rounded-full text-xs -translate-x-1/2 cursor-pointer"
        >
          {ta("clear")} <XIcon size={13} className="top-[0.5px] relative" />
        </span>
      )}
      <div className="relative flex md:flex-row flex-col justify-between items-center bg-white px-4 md:px-2.5 py-5 md:py-2 rounded-[32px] md:rounded-full h-fit md:h-[76px]">
        {hasData() && (
          <span
            onClick={clear}
            className="hidden top-1/2 right-[150px] absolute md:flex justify-center items-center gap-x-1 bg-(--brown)/40 rounded-full w-5 h-5 text-xs -translate-y-1/2 cursor-pointer"
          >
            <XIcon size={13} className="top-[0.5px] relative" />
          </span>
        )}
        <div className="hidden md:flex gap-x-1 w-full h-full">
          <SelectFilter
            placeholder={t("property")}
            items={housePropertiesType}
            value={property}
            setValue={(e) => setFilter("property", e as string)}
            type={"property"}
            className="!border-none"
          />
          <SelectFilter
            placeholder={t("city")}
            items={cityList}
            value={city}
            setValue={(e) => setFilter("city", e as string)}
            className="!border-none"
          />
          <SelectFilter
            placeholder={t("district")}
            items={areaList}
            value={area}
            setValue={(e) => setFilter("district", e as string)}
            className="!border-none"
          />
          <div className="hidden ms:block">
            <SelectFilter
              placeholder={t("bedroom")}
              items={bedrooms}
              value={bedroom}
              setValue={(e) => setFilter("bedroom", e as string)}
              className="!border-none"
            />
          </div>
          <div className="hidden ms:block">
            <SelectFilter
              placeholder={t("bathroom")}
              items={bathrooms}
              value={bathroom}
              setValue={(e) => setFilter("bathroom", e as string)}
              className="!border-none"
            />
          </div>
          <div className="hidden lg:block">
            <SelectFilter
              type="price"
              placeholder={t("price")}
              items={housePriceRange}
              value={price === "noprice" ? "Sans prix" : price}
              setValue={(e) => setFilter("price", e as string)}
              className="!border-none"
            />
          </div>
          <FilterModal />
        </div>
        <div className="md:hidden flex flex-col gap-y-1 mb-5 px-2 w-full h-full">
          <SelectFilter
            placeholder={t("property")}
            items={housePropertiesType}
            value={property}
            setValue={(e) => setFilter("property", e as string)}
            type={"property"}
            className="!border-none"
          />
          <SelectFilter
            placeholder={t("city")}
            items={cityList}
            value={city}
            setValue={(e) => setFilter("city", e as string)}
            className="!border-none"
          />
          <SelectFilter
            placeholder={t("district")}
            items={areaList}
            value={area}
            setValue={(e) => setFilter("district", e as string)}
            className="!border-none"
          />
          <div className="hidden ms:block">
            <SelectFilter
              placeholder={t("bedroom")}
              items={bedrooms}
              value={bedroom}
              setValue={(e) => setFilter("bedroom", e as string)}
              className="!border-none"
            />
          </div>
          <div className="hidden ms:block">
            <SelectFilter
              placeholder={t("bathroom")}
              items={bathrooms}
              value={bathroom}
              setValue={(e) => setFilter("bathroom", e as string)}
              className="!border-none"
            />
          </div>
          <div className="hidden lg:block">
            <SelectFilter
              placeholder={t("price")}
              items={housePriceRange}
              value={price}
              setValue={(e) => setFilter("price", e as string)}
              className="!border-none"
            />
          </div>
          <FilterModal />
        </div>
        <Button
          onClick={handleSubmit}
          variant="search"
          disabled={isLoading}
          className="flex justify-center max-w-full md:max-w-[128px] h-[43px] md:h-full cursor-pointer"
        >
          {isLoading && <Spinner className="stroke-(--light) w-5 h-5" />}
          {!isLoading && (
            <span className="flex items-center gap-x-1">
              {" "}
              <SearchIcon /> {t("search")}
            </span>
          )}
        </Button>
      </div>
    </div>
  );
}
