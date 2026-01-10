"use client";
import React, { useEffect, useState } from "react";
import Filter from "./filter";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import {
  PaginationType,
  RealStateEditNuqsFilterType,
  RealStateNuqsFilterType,
  RealStateType,
} from "@/lib/type";
import TablePagination from "@/components/table-pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Spinner } from "@/components/ui/spinner";
import { Badge } from "@/components/ui/badge";

type HouseTableProps = {
  columns: ColumnDef<RealStateType>[];
  data: RealStateType[] | [];
  realStateFilter: RealStateNuqsFilterType;
  setRealStateFilter: RealStateEditNuqsFilterType;
  isPending: boolean;
  isFetching: boolean;
  total: number;
  totalPages: number;
};

export default function HouseTable({
  columns,
  data,
  realStateFilter,
  setRealStateFilter,
  isFetching,
  isPending,
  total,
  totalPages,
}: HouseTableProps) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    property: false,
    bedroom: false,
    bathroom: false,
    city: false,
    view: false,
    area: false,
    garden: false,
    pool: false,
    furnished: false,
    terrace: false,
    gym: false,
    generator: false,
    room: false,
  });
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
    rowCount: totalPages,
    onPaginationChange: (updater) => {
      if (typeof updater !== "function") return;
      const page: PaginationType = updater(table.getState().pagination);
      setRealStateFilter({
        ...realStateFilter,
        pageIndex: page.pageIndex,
        pageSize: page.pageSize,
      });
    },
    autoResetPageIndex: false,
    manualFiltering: true,
    initialState: {
      pagination: {
        pageIndex: realStateFilter.pageIndex,
        pageSize: realStateFilter.pageSize,
      },
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  useEffect(() => {
    if (data) {
      table.getRowModel();
    }
  }, [data, totalPages, table]);

  useEffect(() => {
    const search = columnFilters.find((d) => d.id === "title")?.value as string;
    const city = columnFilters.find((d) => d.id === "city")?.value as string;
    const area = columnFilters.find((d) => d.id === "area")?.value as string;
    const property = columnFilters.find((d) => d.id === "property")
      ?.value as string;
    const status = columnFilters.find((d) => d.id === "status")
      ?.value as string;
    const bedroom = columnFilters.find((d) => d.id === "bedroom")
      ?.value as string;
    const bathroom = columnFilters.find((d) => d.id === "bathroom")
      ?.value as string;
    const price = columnFilters.find((d) => d.id === "price")?.value as string;
    const view = columnFilters.find((d) => d.id === "view")?.value as string;

    const garden = columnFilters.find((d) => d.id === "garden")
      ?.value as boolean;
    const furnished = columnFilters.find((d) => d.id === "furnished")
      ?.value as boolean;
    const pool = columnFilters.find((d) => d.id === "pool")?.value as boolean;
    const generator = columnFilters.find((d) => d.id === "generator")
      ?.value as boolean;
    const gym = columnFilters.find((d) => d.id === "gym")?.value as boolean;
    const terrace = columnFilters.find((d) => d.id === "terrace")
      ?.value as boolean;
    const initIndex =
      (search && search !== "undefined") ||
      (city && city !== "undefined") ||
      (area && area !== "undefined" && property && property !== "undefined") ||
      (status && status !== "undefined") ||
      (bedroom && bedroom !== "undefined") ||
      (bathroom && bathroom !== "undefined") ||
      (price && price !== "undefined") ||
      garden !== undefined ||
      furnished !== undefined ||
      view !== undefined ||
      pool !== undefined ||
      generator !== undefined ||
      gym !== undefined ||
      terrace !== undefined
        ? 1
        : realStateFilter.pageIndex;

    initIndex;
    realStateFilter.pageIndex;
    const hasPrice = price && price !== "undefined";
    setRealStateFilter({
      ...realStateFilter,
      pageIndex: initIndex,
      search: search && search !== "undefined" ? search : null,
      city: city && city !== "undefined" ? city : null,
      area: area && area !== "undefined" ? area : null,
      property: property && property !== "undefined" ? property : null,
      status: status && status !== "undefined" ? status : null,
      bedroom: bedroom && bedroom !== "undefined" ? bedroom : null,
      bathroom: bathroom && bathroom !== "undefined" ? bathroom : null,
      price:
        hasPrice && price === "Sansprix"
          ? "noprice"
          : hasPrice && price !== "Sansprix"
            ? price
            : null,
      garden: garden !== undefined ? garden : null,
      furnished: furnished !== undefined ? furnished : null,
      view: view !== undefined ? view : null,
      pool: pool !== undefined ? pool : null,
      generator: generator !== undefined ? generator : null,
      gym: gym !== undefined ? gym : null,
      terrace: terrace !== undefined ? terrace : null,
    });
  }, [columnFilters]);
  return (
    <>
      <Filter table={table} isPending={isPending} />
      <div className="space-y-2">
        <div className="flex justify-center sm:justify-end items-center w-full h-9">
          {!isPending && isFetching && (
            <Badge
              variant="outline"
              className="flex gap-x-2 px-4 rounded-full w-fit h-8"
            >
              Mise à jour des données{" "}
              <Spinner size="small" className="!w-4 !h-4" />
            </Badge>
          )}
        </div>
        <Table className="rounded-xl overflow-hidden">
          <TableHeader className="bg-background hover:bg-background">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="hover:bg-transparent border-none"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-center">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isPending && (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <div className="flex justify-center items-center h-full">
                    <Spinner className="!w-4 !h-4" />
                  </div>
                </TableCell>
              </TableRow>
            )}
            {!isPending && table.getRowModel().rows?.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Aucun bien trouvé{" "}
                </TableCell>
              </TableRow>
            )}
            {!isPending &&
              table.getRowModel().rows?.length > 0 &&
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="even:bg-neutral-500/5 border-0"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          table={table}
          pagination={{
            pageIndex: realStateFilter.pageIndex,
            pageSize: realStateFilter.pageSize,
            total,
            totalPages,
          }}
        />
      </div>
    </>
  );
}
