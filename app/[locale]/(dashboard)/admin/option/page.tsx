"use client";
import clsx from "clsx";
import { rubik } from "@/font/font";
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";
import { TOTAL_PAGINATION_PAGE } from "@/lib/constant";
import { useQuery } from "@tanstack/react-query";
import { all, options } from "@/actions/option";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { OptionType } from "@/lib/type";
import OptionTable from "./_components/option-table";
import { columns } from "./_components/columns";

export default function OptionPage() {
  const [{ pageIndex, pageSize, search }, setOptionFilter] = useQueryStates(
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

  const [data, setData] = useState<OptionType[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const query = useQuery({
    queryKey: ["options", pageIndex, pageSize, search],
    queryFn: () => all(pageIndex, pageSize, search),
  });

  const totalOptions = useQuery({
    queryKey: ["total-options"],
    queryFn: () => options(),
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
          Listes des options
        </h2>
        {totalOptions.isLoading && (
          <Skeleton className="bg-neutral-200 mt-1 rounded-full w-[200px] h-2" />
        )}
        {!totalOptions.isLoading && (
          <p className={clsx("text-neutral-400 text-sm", rubik.className)}>
            {totalOptions?.data?.total === 0 && "Aucune option enregistrée"}
            {totalOptions?.data?.total === 1 && "Une option enregistrée"}
            {totalOptions?.data?.total > 1 &&
              `${totalOptions?.data?.total} options enregistrées`}
          </p>
        )}
      </div>
      <div className="space-y-10 pt-10">
        <OptionTable
          columns={columns}
          data={data}
          optionFilter={{
            pageIndex,
            pageSize,
            search,
          }}
          setOptionFilter={setOptionFilter}
          totalPages={totalPages}
          isPending={query.isPending}
          isFetching={query.isFetching}
          total={total}
        />
      </div>
    </>
  );
}
