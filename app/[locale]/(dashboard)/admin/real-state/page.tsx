"use client";
import HouseTable from "./_components/house-table";
import clsx from "clsx";
import { rubik } from "@/font/font";
import {
  parseAsBoolean,
  parseAsInteger,
  parseAsString,
  useQueryStates,
} from "nuqs";
import { TOTAL_PAGINATION_PAGE } from "@/lib/constant";
import { useEffect, useState } from "react";
import { RealStateType } from "@/lib/type";
import { useQuery } from "@tanstack/react-query";
import { all, realstates } from "@/actions/realstate";
import { Skeleton } from "@/components/ui/skeleton";
import { columns } from "./_components/columns";

export default function HousePage() {
  const [
    {
      pageIndex,
      pageSize,
      search,
      city,
      area,
      property,
      status,
      bedroom,
      bathroom,
      price,
      garden,
      view,
      furnished,
      pool,
      generator,
      gym,
      terrace,
    },
    setRealStateFilter,
  ] = useQueryStates(
    {
      pageIndex: parseAsInteger.withDefault(1),
      pageSize: parseAsInteger.withDefault(TOTAL_PAGINATION_PAGE as number),
      search: parseAsString.withDefault(""),
      city: parseAsString.withDefault(""),
      area: parseAsString.withDefault(""),
      property: parseAsString.withDefault(""),
      status: parseAsString.withDefault(""),
      bedroom: parseAsString.withDefault(""),
      view: parseAsString.withDefault(""),
      bathroom: parseAsString.withDefault(""),
      price: parseAsString.withDefault(""),
      garden: parseAsBoolean,
      furnished: parseAsBoolean,
      pool: parseAsBoolean,
      generator: parseAsBoolean,
      gym: parseAsBoolean,
      terrace: parseAsBoolean,
    },
    {
      urlKeys: {
        pageIndex: "page",
        pageSize: "pageSize",
        search: "search",
        city: "city",
        area: "area",
        property: "property",
        status: "status",
        bedroom: "bedroom",
        bathroom: "bathroom",
        price: "price",
        garden: "garden",
        view: "view",
        furnished: "furnished",
        pool: "pool",
        generator: "generator",
        gym: "gym",
        terrace: "terrace",
      },
      shallow: false,
    }
  );

  const [data, setData] = useState<RealStateType[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const query = useQuery({
    queryKey: [
      "realstates",
      pageIndex,
      pageSize,
      search,
      city,
      area,
      property,
      status,
      bedroom,
      bathroom,
      price,
      garden,
      furnished,
      view,
      pool,
      generator,
      gym,
      terrace,
    ],
    queryFn: () =>
      all(
        pageIndex,
        pageSize,
        search,
        city,
        area,
        property,
        status,
        bedroom,
        bathroom,
        price,
        view,
        garden,
        furnished,
        pool,
        generator,
        gym,
        terrace
      ),
  });

  const totalRealState = useQuery({
    queryKey: ["total-realstates"],
    queryFn: () => realstates(),
  });

  useEffect(() => {
    if (query.data) {
      setTotal(query.data.total);
      setData(query.data.data);
      setTotalPages(Math.ceil((query.data.total ?? 0) / TOTAL_PAGINATION_PAGE));
    }
  }, [query.data]);

  return (
    <>
      <div className="-space-y-0.5 pt-6">
        <h2
          className={clsx(
            "font-semibold text-(--turquoise) text-xl uppercase",
            rubik.className
          )}
        >
          Listes des maisons
        </h2>
        {totalRealState.isLoading && (
          <Skeleton className="bg-neutral-200 mt-1 rounded-full w-[200px] h-2" />
        )}
        {!totalRealState.isLoading && (
          <p className={clsx("text-neutral-400 text-sm", rubik.className)}>
            {totalRealState.data.total === 0 && "Aucune maison enregistrée"}
            {totalRealState.data.total === 1 && "Une maison enregistrée"}
            {totalRealState.data.total > 1 &&
              `${totalRealState.data.total} maisons enregistrées`}
          </p>
        )}
      </div>
      <div className="space-y-5 pt-10">
        <HouseTable
          columns={columns}
          data={data}
          realStateFilter={{
            pageIndex,
            pageSize,
            search,
            city,
            area,
            property,
            status,
            bedroom,
            bathroom,
            price,
            garden,
            furnished,
            view,
            pool,
            generator,
            gym,
            terrace,
          }}
          setRealStateFilter={setRealStateFilter}
          totalPages={totalPages}
          isPending={query.isPending}
          isFetching={query.isFetching}
          total={total}
        />
      </div>
    </>
  );
}
