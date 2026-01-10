import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronDownIcon,
  EllipsisIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import { SearchEditNuqsFilterType, SearchNuqsFilterType } from "@/lib/type";
import { useTablePagination } from "@/hooks/useTablePagination";
import { useMemo } from "react";

type ProductPaginationProps = {
  setHouseFilter: SearchEditNuqsFilterType;
  houseFilter: SearchNuqsFilterType;
  pagination: {
    pageIndex: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
};

export default function ProductPagination({
  setHouseFilter,
  houseFilter,
  pagination,
}: ProductPaginationProps) {
  const {
    totalPages,
    goToNextPage,
    goToPreviousPage,
    canGoToNextPage,
    canGoToPreviousPage,
  } = useTablePagination(pagination);

  const currentPage = pagination.pageIndex;

  // Fonction pour changer de page
  const changePage = (pageNumber: number) => {
    setHouseFilter({
      ...houseFilter,
      pageIndex: pageNumber,
    });
  };

  const pagesToShow = useMemo(() => {
    const pages = [];

    pages.push(1);

    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);

    if (startPage > 2) {
      pages.push("ellipsis-start");
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages - 1) {
      pages.push("ellipsis-end");
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  }, [currentPage, totalPages]);

  const handleShowMore = () => {
    if (canGoToNextPage()) {
      changePage(currentPage + 1);
    }
  };

  return (
    <>
      <div className="hidden sm:flex justify-between items-center">
        <Button
          variant="pagination"
          className="h-12"
          disabled={!canGoToPreviousPage()}
          onClick={() => changePage(goToPreviousPage())}
        >
          <ArrowLeftIcon size={40} />
        </Button>

        <ul className="flex gap-x-2">
          {pagesToShow.map((page, index) => {
            if (page === "ellipsis-start" || page === "ellipsis-end") {
              return (
                <li
                  key={`ellipsis-${index}`}
                  className="flex justify-center items-center rounded-full w-12 h-12 text-[--deep-dark]"
                >
                  <EllipsisIcon size={15} />
                </li>
              );
            }

            return (
              <li
                key={`page-${page}`}
                className={`flex justify-center items-center rounded-full hover:bg-(--blue-light)/40 w-12 h-12 text-[--deep-dark] cursor-pointer ${
                  currentPage === Number(page) ? "!bg-(--blue-light)" : ""
                }`}
                onClick={() => changePage(page as number)}
              >
                {page}
              </li>
            );
          })}
        </ul>

        <Button
          variant="pagination"
          className="h-12"
          disabled={!canGoToNextPage()}
          onClick={() => changePage(goToNextPage())}
        >
          <ArrowRightIcon size={40} />
        </Button>
      </div>

      <Button
        variant="filter"
        className="sm:hidden flex w-full max-w-full h-[42px]"
        onClick={handleShowMore}
        disabled={!canGoToNextPage()}
      >
        <span>Show more</span>
        <span>
          <ChevronDownIcon size={15} />
        </span>
      </Button>
    </>
  );
}
