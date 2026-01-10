"use client";
import CityTable from "./_components/city-table";
import clsx from "clsx";
import { rubik } from "@/font/font";
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";
import { TOTAL_PAGINATION_PAGE } from "@/lib/constant";
import { useQuery } from "@tanstack/react-query";
import { all, cities } from "@/actions/city";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { columns } from "./_components/columns";
import { CityType } from "@/lib/type";

export default function CityPage() {
  const [{ pageIndex, pageSize, search }, setCityFilter] = useQueryStates(
    {
      pageIndex: parseAsInteger.withDefault(1),
      pageSize: parseAsInteger.withDefault(TOTAL_PAGINATION_PAGE as number),
      search: parseAsString.withDefault(""),
    },
    {
      urlKeys: {
        pageIndex: "page",
        pageSize: "pageSize",
        search: "search",
      },
      shallow: false,
    }
  );

  const [data, setData] = useState<CityType[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const query = useQuery({
    queryKey: ["cities", pageIndex, pageSize, search],
    queryFn: () => all(pageIndex, pageSize, search),
  });

  const totalCities = useQuery({
    queryKey: ["total-cities"],
    queryFn: () => cities(),
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
          Listes des villes
        </h2>
        {totalCities.isLoading && (
          <Skeleton className="bg-neutral-200 mt-1 rounded-full w-[200px] h-2" />
        )}
        {!totalCities.isLoading && (
          <p className={clsx("text-neutral-400 text-sm", rubik.className)}>
            {totalCities.data.total === 0 && "Aucune ville enregistrée"}
            {totalCities.data.total === 1 && "Une ville enregistrée"}
            {totalCities.data.total > 1 &&
              `${totalCities.data.total} villes enregistrées`}
          </p>
        )}
      </div>
      <div className="space-y-10 pt-10">
        <CityTable
          columns={columns}
          data={data}
          cityFilter={{
            pageIndex,
            pageSize,
            search,
          }}
          setCityFilter={setCityFilter}
          totalPages={totalPages}
          isPending={query.isPending}
          isFetching={query.isFetching}
          total={total}
        />
      </div>
    </>
  );
}
