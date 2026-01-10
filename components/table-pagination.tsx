import { Button } from "@/components/ui/button";
import { useTablePagination } from "@/hooks/useTablePagination";
import { TablePaginationType } from "@/lib/type";
import { Table } from "@tanstack/react-table";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import React from "react";

interface DrugsTablePaginationProps<TData> {
  table: Table<TData>;
  pagination: TablePaginationType;
}

export default function TablePagination<TData>({
  table,
  pagination,
}: DrugsTablePaginationProps<TData>) {
  const {
    goToPreviousPage,
    canGoToPreviousPage,
    goToNextPage,
    canGoToNextPage,
  } = useTablePagination(pagination);

  if (pagination.totalPages < 2) {
    return null;
  }
  return (
    <div className="flex justify-end items-center space-x-2">
      <Button
        variant="pagination"
        size="sm"
        className="bg-neutral-500/5 hover:bg-neutral-500/10 shadow-none rounded-lg w-8 h-8 text-neutral-700 transition"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          table.setPageIndex(goToPreviousPage());
        }}
        disabled={!canGoToPreviousPage()}
      >
        <ChevronLeftIcon size={15} />
      </Button>
      <Button
        variant="pagination"
        size="sm"
        className="bg-neutral-500/5 hover:bg-neutral-500/10 shadow-none rounded-lg w-8 h-8 text-neutral-700 transition"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          table.setPageIndex(goToNextPage());
        }}
        disabled={!canGoToNextPage()}
      >
        <ChevronRightIcon size={15} />
      </Button>
    </div>
  );
}
