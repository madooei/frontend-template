import { useEffect, useState } from "react";
import { Loader2, Plus } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@madooei/shadcn-all-in-one/card";
import { Button } from "@madooei/shadcn-all-in-one/button";
import { Input } from "@madooei/shadcn-all-in-one/input";
import LoadingPage from "@/pages/loading-page";
import EmptyPage from "@/pages/empty";

import type { TodoType } from "@/types/todo-types";
import { useCreateTodo, useTodos } from "@/hooks/use-todos-v3";
import { toast } from "sonner";

const TodosPage: React.FC = () => {
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const { todos, isLoading, error: queryError } = useTodos();
  const {
    mutate,
    isPending,
    isSuccess,
    error: mutationError,
  } = useCreateTodo();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent the default browser refresh
    e.preventDefault();
    // Stop the event from bubbling up to parent components
    e.stopPropagation();

    if (!newTodoTitle.trim()) return;

    mutate({
      id: Date.now(),
      title: newTodoTitle.trim(),
    });
  };

  // This useEffect handles side-effects for the QUERY
  useEffect(() => {
    if (queryError) {
      toast.error("An error occurred while fetching todos.", {
        description: queryError.message,
      });
    }
  }, [queryError]);

  // This new useEffect handles side-effects for the MUTATION
  useEffect(() => {
    if (isSuccess) {
      toast.success("Todo created successfully!");
      setNewTodoTitle("");
    }
    if (mutationError) {
      toast.error("Failed to create todo.", {
        description: mutationError.message,
      });
    }
  }, [isSuccess, mutationError]);

  return (
    <div className="container max-w-2xl py-8">
      <Card className="mx-6">
        <CardHeader>
          <CardTitle className="text-2xl">Todo List</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
            <Input
              placeholder="Add a new todo..."
              value={newTodoTitle}
              onChange={(e) => setNewTodoTitle(e.target.value)}
              disabled={isPending}
            />
            <Button type="submit" disabled={isPending || !newTodoTitle.trim()}>
              {isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Plus className="h-4 w-4" />
              )}
              <span className="ml-2">Add</span>
            </Button>
          </form>
          {isLoading && <LoadingPage />}
          <ul className="space-y-2">
            {todos?.map((todo: TodoType) => (
              <li
                key={todo.id}
                className="flex items-center justify-between p-3 rounded-lg border bg-card"
              >
                <span>{todo.title}</span>
              </li>
            ))}
            {todos?.length === 0 && (
              <EmptyPage message={"No todos yet. Add one above!"} />
            )}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default TodosPage;
