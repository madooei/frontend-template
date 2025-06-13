import type { TodoType } from "@/types/todo-types";
import { env } from "@/env";

const getTodos = async (): Promise<TodoType[]> => {
  const response = await fetch(`${env.API_URL}/todos`);
  return response.json();
};

const createTodo = async (todo: TodoType): Promise<TodoType> => {
  const response = await fetch(`${env.API_URL}/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  return response.json();
};

export { getTodos, createTodo };
