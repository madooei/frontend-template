// In this version, we use local state without API calls.

import { useEffect, useState } from "react";
import { $todos, addTodo } from "@/stores/todos-store";
import { useStore } from "@nanostores/react";
import type { TodoType } from "@/types/todo-types";

export const useTodos = () => {
  const todos = useStore($todos);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadData = async () => {
    try {
      setIsLoading(true);
      // Simulate an API call
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate a delay
    } catch (error) {
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return {
    todos,
    isLoading,
    error,
  };
};

export const useCreateTodo = () => {
  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createTodoMutation = async (todo: TodoType) => {
    // Reset state before the mutation runs
    setIsSuccess(false);
    setError(null);
    setIsPending(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate a delay
      addTodo(todo);
      setIsSuccess(true);
    } catch (error) {
      setError(error as Error);
    } finally {
      setIsPending(false);
    }
  };

  return { mutate: createTodoMutation, isPending, isSuccess, error };
};
