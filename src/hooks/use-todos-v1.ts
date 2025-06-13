// In this version, we use local state + direct API calls.

import { useEffect, useState } from "react";
import { createTodo, getTodos } from "@/services/todos-api";
import { $todos, addTodo, setTodos } from "@/stores/todos-store";
import { useStore } from "@nanostores/react";
import type { TodoType } from "@/types/todo-types";

export const useTodos = () => {
  const todos = useStore($todos);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const data: TodoType[] = await getTodos();
      setTodos(data);
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
      const data = await createTodo(todo);
      addTodo(data);
      setIsSuccess(true);
    } catch (error) {
      setError(error as Error);
    } finally {
      setIsPending(false);
    }
  };

  return { mutate: createTodoMutation, isPending, isSuccess, error };
};
