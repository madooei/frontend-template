// In this version, we use react-query to manage the data without
// using the store.

import { createTodo, getTodos } from "@/services/todos-api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { TodoType } from "@/types/todo-types";

export const useTodos = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,

    // change these to false if you want to disable refetching
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchOnReconnect: true,
  });

  return {
    todos: data,
    isLoading,
    error,
  };
};

export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, isSuccess, error } = useMutation({
    mutationFn: createTodo,
    onSuccess: (data) => {
      // Invalidate and refetch
      // queryClient.invalidateQueries({ queryKey: ["todos"] });

      // Or, manually update the cache for the 'todos' query.
      // This is a more efficient way to add an item to a list
      // without needing to refetch the entire list from the server.
      queryClient.setQueryData(["todos"], (oldData: TodoType[] | undefined) => {
        return oldData ? [...oldData, data] : [data];
      });
    },
  });

  return { mutate, isPending, isSuccess, error };
};
