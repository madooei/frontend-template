// In this version, we use react-query to manage the data and sync
// its data with the store.

// react-query already stores the data in the cache, so we don't need to
// use the store to manage the data. This is shown here for completeness, in 
// case you want to use the store for other things.

import { useEffect } from "react";
import { createTodo, getTodos } from "@/services/todos-api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { $todos, addTodo, setTodos } from "@/stores/todos-store";
import { useStore } from "@nanostores/react";
import type { TodoType } from "@/types/todo-types";

export const useTodos = () => {
  const todos = useStore($todos);

  const { isLoading, error, data } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,

    // change these to false if you want to disable refetching
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchOnReconnect: true,
  });

  useEffect(() => {
    // Keep the data in the store up to date
    if (data) {
      setTodos(data);
    }
  }, [data]);

  return {
    todos,
    isLoading,
    error,
  };
};


export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  const {
    mutate,
    isPending,
    isSuccess,
    error
  } = useMutation({
    mutationFn: createTodo,
    onSuccess: (data) => {
      // Update the store directly for a more optimistic-feeling UI.
      addTodo(data);

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
