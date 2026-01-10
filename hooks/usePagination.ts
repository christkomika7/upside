import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

interface UsePaginationProps<T> {
    queryKey: string;
    queryFn: (page: number, pageSize: number) => Promise<{
        data: T[];
        total: number;
    }>;
    pageSize?: number;
}

export function usePagination<T>({
    queryKey,
    queryFn,
    pageSize = 5
}: UsePaginationProps<T>) {
    const [page, setPage] = useState(1);

    const query = useQuery({
        queryKey: [queryKey, page, pageSize],
        queryFn: () => queryFn(page, pageSize),
    });

    const totalPages = Math.ceil((query.data?.total ?? 0) / pageSize);

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    return {
        data: query.data?.data ?? [],
        total: query.data?.total ?? 0,
        page,
        pageSize,
        totalPages,
        handlePageChange,
        isLoading: query.isLoading,
        isFetching: query.isFetching,
        isPending: query.isFetching
    }
}