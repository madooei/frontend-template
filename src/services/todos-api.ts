import type { TodoType } from "@/types/todo-types";

const API_URL = import.meta.env.VITE_API_URL;

console.log("API_URL", API_URL);

const getTodos = async (): Promise<TodoType[]> => {
  const response = await fetch(`${API_URL}/todos`);
  return response.json();
};

const createTodo = async (todo: TodoType): Promise<TodoType> => {
  const response = await fetch(`${API_URL}/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  return response.json();
};

export { getTodos, createTodo };
