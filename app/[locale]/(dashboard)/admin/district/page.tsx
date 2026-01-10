"use client";
import AreaTable from "./_components/area-table";
import clsx from "clsx";
import { rubik } from "@/font/font";
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";
import { TOTAL_PAGINATION_PAGE } from "@/lib/constant";
import { useEffect, useState } from "react";
import { AreaType } from "@/lib/type";
import { useQuery } from "@tanstack/react-query";
import { all, areas } from "@/actions/area";
import { Skeleton } from "@/components/ui/skeleton";
import { columns } from "./_components/columns";

export default function DistrictPage() {
  const [{ pageIndex, pageSize, search }, setAreaFilter] = useQueryStates(
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
    },
  );

  const [data, setData] = useState<AreaType[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const query = useQuery({
    queryKey: ["areas", pageIndex, pageSize, search],
    queryFn: () => all(pageIndex, pageSize, search),
  });

  const totalAreas = useQuery({
    queryKey: ["total-areas"],
    queryFn: () => areas(),
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
            rubik.className,
          )}
        >
          Listes des quartiers
        </h2>
        {totalAreas.isLoading && (
          <Skeleton className="bg-neutral-200 mt-1 rounded-full w-[200px] h-2" />
        )}
        {!totalAreas.isLoading && (
          <p className={clsx("text-neutral-400 text-sm", rubik.className)}>
            {totalAreas.data.total === 0 && "Aucun quartier enregistré"}
            {totalAreas.data.total === 1 && "Un quartier enregistré"}
            {totalAreas.data.total > 1 &&
              `${totalAreas.data.total} quartiers enregistrés`}
          </p>
        )}
      </div>
      <div className="space-y-10 pt-10">
        <AreaTable
          columns={columns}
          data={data}
          cityFilter={{
            pageIndex,
            pageSize,
            search,
          }}
          setCityFilter={setAreaFilter}
          totalPages={totalPages}
          isPending={query.isPending}
          isFetching={query.isFetching}
          total={total}
        />
      </div>
    </>
  );
}
