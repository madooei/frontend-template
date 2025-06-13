import { persistentAtom } from "@nanostores/persistent";
import type { TodoType } from "@/types/todo-types";

const DEBUG = false;

const defaultTodos: TodoType[] = [];
const storageKey = "todos";

export const $todos = persistentAtom<TodoType[]>(storageKey, defaultTodos, {
  encode: JSON.stringify,
  decode: JSON.parse,
});

export const setTodos = (todos: TodoType[]) => {
  $todos.set(todos);
};

export function addTodo(todo: TodoType) {
  $todos.set([...$todos.get(), todo]);
}

if (DEBUG) {
  import("@nanostores/logger").then(({ logger }) => {
    logger({ $todos });
  });
}
