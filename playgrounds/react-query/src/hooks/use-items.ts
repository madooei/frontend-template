import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createItem, getItems } from "../services/items-api";
import { useEffect } from "react";

const DEBUG = true;

export const useItems = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["items"],
    queryFn: getItems,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchOnReconnect: true,
  });

  useEffect(() => {
    if (DEBUG) {
      if (isLoading) {
        console.log("Loading items...");
      } else if (error) {
        console.error("Error fetching items:", error);
      } else if (data) {
        console.log("Items fetched successfully:", data);
      }
    }
  }, [isLoading, error, data]);

  return {
    items: data || [],
    isLoading,
    error,
  };
};

export const useCreateItem = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, isSuccess, error } = useMutation({
    mutationFn: createItem, // The function to create a new item on the server
    onSuccess: (data) => {
      if (DEBUG) {
        console.log("onSuccess called with data:", data);
      }

      // Invalidate the items query to refetch the updated list
      if (DEBUG) {
        console.log("Going to invalidate items query");
      }
      queryClient.invalidateQueries({ queryKey: ["items"] });

      // Or you can optimistically update the cache
      // queryClient.setQueryData(["items"], (oldData: string[] | undefined) => {
      //   const newData = oldData ? [...oldData, data] : [data];
      //   if (DEBUG) {
      //     console.log("Optimistic update:", { oldData, newData });
      //   }
      //   return newData;
      // });
    },
  });

  useEffect(() => {
    if (DEBUG) {
      if (isPending) {
        console.log("Pending item creation...");
      } else if (error) {
        console.error("Error creating items:", error);
      } else if (isSuccess) {
        console.log("Item created successfully");
      }
    }
  }, [isPending, error, isSuccess]);

  return { mutate, isPending, isSuccess, error };
};
