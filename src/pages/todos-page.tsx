import { getTodos, createTodo } from "@/services/todos-api";
import type { TodoType } from "@/types/todo-types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Loader2, Plus } from "lucide-react";

const TodosPage: React.FC = () => {
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const queryClient = useQueryClient();

  const query = useQuery({ queryKey: ["todos"], queryFn: getTodos });

  const mutation = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      setNewTodoTitle("");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodoTitle.trim()) return;

    mutation.mutate({
      id: Date.now(),
      title: newTodoTitle.trim(),
    });
  };

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
              disabled={mutation.isPending}
            />
            <Button
              type="submit"
              disabled={mutation.isPending || !newTodoTitle.trim()}
            >
              {mutation.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Plus className="h-4 w-4" />
              )}
              <span className="ml-2">Add</span>
            </Button>
          </form>

          {query.isLoading ? (
            <div className="flex justify-center py-4">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : query.isError ? (
            <div className="text-destructive text-center py-4">
              Error loading todos. Please try again.
            </div>
          ) : (
            <ul className="space-y-2">
              {query.data?.map((todo: TodoType) => (
                <li
                  key={todo.id}
                  className="flex items-center justify-between p-3 rounded-lg border bg-card"
                >
                  <span>{todo.title}</span>
                </li>
              ))}
              {query.data?.length === 0 && (
                <li className="text-center text-muted-foreground py-4">
                  No todos yet. Add one above!
                </li>
              )}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TodosPage;
