"use client";
import React, { Dispatch, RefObject, SetStateAction, useEffect } from "react";
import Filters from "./filter/filters";
import MapFilter from "./filter/map-filter";
import ShowFilter from "./filter/show-filter";
import ProductCard from "../card/product-card";
import ProductPagination from "./product-pagination";
import {
  parseAsBoolean,
  parseAsInteger,
  parseAsString,
  useQueryStates,
} from "nuqs";
import { CLIENT_TOTAL_PAGINATION_PAGE } from "@/lib/constant";
import { HouseFilterType, RealStateType, RequestResponse } from "@/lib/type";
import CardLoader from "../card-loader";
import Image from "next/image";
import { UseMutateFunction } from "@tanstack/react-query";
import useFilters from "@/stores/useFilters";

type ProductsProps = {
  ref: RefObject<HTMLDivElement | null>;
  title: React.ReactNode;
  category: "buy" | "rent";
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  mutate: UseMutateFunction<
    RequestResponse<RealStateType>,
    Error,
    HouseFilterType,
    unknown
  >;
  data: RequestResponse<RealStateType> | undefined;
};

export default function Products({
  title,
  category,
  isLoading,
  setIsLoading,
  mutate,
  data,
  ref,
}: ProductsProps) {
  const setFilter = useFilters.use.setFilter();
  const [houseFilter, setHouseFilter] = useQueryStates(
    {
      pageIndex: parseAsInteger.withDefault(1),
      pageSize: parseAsInteger.withDefault(
        CLIENT_TOTAL_PAGINATION_PAGE as number
      ),
      city: parseAsString.withDefault(""),
      area: parseAsString.withDefault(""),
      property: parseAsString.withDefault(""),
      status: parseAsString.withDefault(""),
      bedroom: parseAsString.withDefault(""),
      bathroom: parseAsString.withDefault(""),
      price: parseAsString.withDefault(""),
      filter: parseAsString.withDefault(""),
      view: parseAsString.withDefault(""),
      garden: parseAsBoolean.withDefault(false),
      furnished: parseAsBoolean.withDefault(false),
      pool: parseAsBoolean.withDefault(false),
      generator: parseAsBoolean.withDefault(false),
      gym: parseAsBoolean.withDefault(false),
      terrace: parseAsBoolean.withDefault(false),
      active: parseAsInteger.withDefault(0),
    },
    {
      urlKeys: {
        pageIndex: "page",
        pageSize: "pageSize",
        city: "city",
        area: "district",
        property: "property",
        bedroom: "bedroom",
        bathroom: "bathroom",
        view: "view",
        price: "price",
        garden: "garden",
        furnished: "furnished",
        pool: "pool",
        generator: "generator",
        gym: "gym",
        terrace: "terrace",
        active: "active",
      },
      shallow: false,
    }
  );
  useEffect(() => {
    setIsLoading(true);
    console.log("House filter:", houseFilter);
    houseFilter.property && setFilter("property", houseFilter.property);
    houseFilter.city && setFilter("city", houseFilter.city);
    houseFilter.area && setFilter("district", houseFilter.area);
    houseFilter.price && setFilter("price", houseFilter.price);
    houseFilter.bedroom && setFilter("bedroom", houseFilter.bedroom);
    houseFilter.bathroom && setFilter("bathroom", houseFilter.bathroom);
    houseFilter.view && setFilter("view", houseFilter.view);
    houseFilter.furnished && setFilter("furnished", houseFilter.furnished);
    houseFilter.garden && setFilter("garden", houseFilter.garden);
    houseFilter.generator && setFilter("generator", houseFilter.generator);
    houseFilter.gym && setFilter("gym", houseFilter.gym);
    houseFilter.pool && setFilter("pool", houseFilter.pool);
    houseFilter.terrace && setFilter("terrance", houseFilter.terrace);
    houseFilter.filter && setFilter("filter", houseFilter.filter);
    mutate({
      page: houseFilter.pageIndex ?? 1,
      pageSize: houseFilter.pageSize,
      property: houseFilter.property,
      city: houseFilter.city,
      district: houseFilter.area,
      price: houseFilter.price,
      bedroom: houseFilter.bedroom,
      bathroom: houseFilter.bathroom,
      view: houseFilter.view,
      furnished: houseFilter.furnished,
      pool: houseFilter.pool,
      generator: houseFilter.generator,
      gym: houseFilter.gym,
      terrace: houseFilter.terrace,
      garden: houseFilter.garden,
      filter: houseFilter.filter,
    });
  }, [houseFilter]);

  return (
    <div className="relative bg-(--light)">
      <div className="-top-[55px] left-0 z-10 absolute bg-(--light) rounded-t-[64px] w-full h-14"></div>
      <div className="mx-auto px-2 pt-4 pb-44 max-w-[1140px]">
        <h2 className="mb-8 font-semibold text-(--deep-dark) text-[30px] sm:text-[44px] text-center">
          {title}
        </h2>
        <div className="mb-12">
          <Filters searchHouseFilter={setHouseFilter} isLoading={isLoading} />
        </div>
        <div className="flex justify-end sm:justify-between mb-6 sm:mb-8 w-full">
          <MapFilter
            section={category}
            datas={(data?.data && (data?.data as RealStateType[])) ?? []}
          />
          <ShowFilter
            section={category}
            houseFilter={houseFilter}
            setHouseFilter={setHouseFilter}
          />
        </div>

        <div ref={ref}>
          <div className="gap-4 lg:gap-8 grid grid-cols-1 md:grid-cols-2 mb-12">
            {isLoading && <CardLoader />}
            {!isLoading &&
              data?.data &&
              (data?.data as RealStateType[]).length > 0 &&
              (data?.data as RealStateType[]).map((house) => (
                <ProductCard key={house.id} house={house} />
              ))}
          </div>
          {!isLoading &&
            data?.data &&
            (data?.data as RealStateType[]).length === 0 && (
              <p className="flex flex-col justify-center items-center gap-4 p-8 w-full text-neutral-600 text-2xl text-center">
                <Image
                  src="/empty.png"
                  alt="Empty"
                  width={100}
                  height={100}
                  className="opacity-30 object-center object-cover"
                />
                Aucun bien trouvé.
              </p>
            )}
        </div>
        {data?.total && data.totalPages && data.totalPages > 1 && data.data ? (
          <ProductPagination
            pagination={{
              pageIndex: houseFilter.pageIndex ?? 1,
              pageSize: CLIENT_TOTAL_PAGINATION_PAGE,
              total: data.total,
              totalPages: data.totalPages,
            }}
            houseFilter={houseFilter}
            setHouseFilter={setHouseFilter}
          />
        ) : null}
      </div>
    </div>
  );
}
