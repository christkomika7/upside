"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DataNuqsFilterType,
  DataEditNuqsFilterType,
  PaginationType,
  OptionType,
} from "@/lib/type";
import { useEffect, useState } from "react";
import {
  ColumnDef,
  SortingState,
  flexRender,
  ColumnFiltersState,
  getPaginationRowModel,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Spinner } from "@/components/ui/spinner";
import { Badge } from "@/components/ui/badge";
import TablePagination from "@/components/table-pagination";
import Action from "./action";

type OptionTableProps = {
  columns: ColumnDef<OptionType>[];
  data: OptionType[];
  optionFilter: DataNuqsFilterType;
  setOptionFilter: DataEditNuqsFilterType;
  isPending: boolean;
  isFetching: boolean;
  total: number;
  totalPages: number;
};

export default function OptionTable({
  columns,
  data,
  optionFilter,
  setOptionFilter,
  isPending,
  isFetching,
  total,
  totalPages,
}: OptionTableProps) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
    rowCount: totalPages,
    onPaginationChange: (updater) => {
      if (typeof updater !== "function") return;
      const page: PaginationType = updater(table.getState().pagination);
      setOptionFilter({
        ...optionFilter,
        pageIndex: page.pageIndex,
        pageSize: page.pageSize,
      });
    },
    autoResetPageIndex: false,
    initialState: {
      pagination: {
        pageIndex: optionFilter.pageIndex,
        pageSize: optionFilter.pageSize,
      },
    },
    state: {
      sorting,
      columnFilters,
    },
  });

  useEffect(() => {
    const search = columnFilters.find((d) => d.id === "name")?.value as string;

    setOptionFilter({
      ...optionFilter,
      search: search && search !== "undefined" ? search : null,
    });
  }, [columnFilters]);
  return (
    <>
      <Action table={table} isPending={isPending} />
      <div className="space-y-2">
        <div className="flex justify-center sm:justify-end items-center w-full h-9">
          {!isPending && isFetching && (
            <Badge
              variant="outline"
              className="flex gap-x-2 px-4 rounded-full w-fit h-8"
            >
              Mise à jour des données
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
                  Aucune option trouvée{" "}
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
            pageIndex: optionFilter.pageIndex,
            pageSize: optionFilter.pageSize,
            total,
            totalPages,
          }}
        />
      </div>
    </>
  );
}
