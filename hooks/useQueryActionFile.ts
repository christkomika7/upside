"use client";

import { QueryResponse } from "@/lib/type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useQueryActionFile<T, K extends QueryResponse>(
  action: (data: T) => Promise<K>,
  successAction?: () => void,
  validateData?: string | string[],
  onActionSuccess?: (data: K) => void,
  hasMessage: boolean = true,
) {
  const queryClient = useQueryClient();

  const { data, mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: async (data: T) => {
      try {
        // Execute the action and await its response
        const response = await action(data);

        // Return the response
        return response;
      } catch (error) {
        // Make sure any loading toast is dismissed on error
        toast.dismiss();
        throw error;
      }
    },
    onSuccess: (data) => {
      if (hasMessage) {
        toast.success(data.message);
      }

      // Execute success callbacks
      if (onActionSuccess) {
        onActionSuccess(data);
      }

      if (successAction) {
        // Add a small delay to ensure the browser doesn't reload
        // before success actions complete
        setTimeout(() => {
          successAction();
        }, 100);
      }
    },
    onError: (error: any) => {
      if (hasMessage) {
        toast.error(error.message || "Une erreur est survenue");
      }
    },
    onSettled: () => {
      if (validateData) {
        if (Array.isArray(validateData)) {
          queryClient.invalidateQueries({ queryKey: validateData });
          return;
        }
        queryClient.invalidateQueries({ queryKey: [validateData] });
      }
    },
  });

  return {
    data,
    mutate,
    isPending,
    isError,
    isSuccess,
  };
}
