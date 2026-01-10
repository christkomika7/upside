import { TablePaginationType } from "@/lib/type";


export const useTablePagination = (paginationInfo: TablePaginationType) => {
    const goToNextPage = (): number => {
        if (paginationInfo.pageIndex >= paginationInfo.totalPages) {
            return paginationInfo.pageIndex;
        }
        return paginationInfo.pageIndex + 1;
    };

    const goToPreviousPage = (): number => {
        if (paginationInfo.pageIndex <= 1) {
            return paginationInfo.pageIndex;
        }
        return paginationInfo.pageIndex - 1;
    };

    const canGoToNextPage = (): boolean => {
        return paginationInfo.pageIndex < paginationInfo.totalPages;
    };

    const canGoToPreviousPage = (): boolean => {
        return paginationInfo.pageIndex > 1;
    };

    return {
        goToNextPage,
        goToPreviousPage,
        canGoToNextPage,
        canGoToPreviousPage,
        currentPage: paginationInfo.pageIndex,
        totalPages: paginationInfo.totalPages,
        pageSize: paginationInfo.pageSize,
        total: paginationInfo.total,
    };
};