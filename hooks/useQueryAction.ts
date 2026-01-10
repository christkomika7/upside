"use client";
import { QueryResponse } from "@/lib/type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useQueryAction<T, K extends QueryResponse>(
    action: (data: T) => Promise<K>,
    successAction?: () => void,
    validateData?: string | string[],
    onActionSuccess?: (data: K) => void,
    hasMessage: boolean = true

) {

    const queryClient = useQueryClient();

    const { data, mutate, isPending, isError, isSuccess, } = useMutation({
        mutationFn: async (data: T) => await action(data),
        onSuccess: (data) => {
            if (hasMessage) {
                toast.success(data.message);
            }
            if (onActionSuccess) {
                onActionSuccess(data)
            }

            if (successAction) {
                successAction()
            }
        },
        onError: (error) => {
            if (hasMessage) {

                toast.success(error.message);
            }
        },
        onSettled: () => {
            if (validateData) {
                if (Array.isArray(validateData)) {
                    queryClient.invalidateQueries({ queryKey: validateData })
                    return
                }
                queryClient.invalidateQueries({ queryKey: [validateData] })
            }
        }
    });

    return {
        data,
        mutate,
        isPending,
        isError,
        isSuccess,
    };
}
