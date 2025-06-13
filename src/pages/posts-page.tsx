import { useLoaderData, useFetcher } from "react-router";
import { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Plus } from "lucide-react";
import type { PostType } from "@/types/post-types";
import EmptyPage from "./empty";

export const Component: React.FC = () => {
  const { posts } = useLoaderData() as { posts: PostType[] };

  // Initialize the fetcher instead of useNavigation/useActionData
  const fetcher = useFetcher<{ error?: string; success?: boolean }>();
  const formRef = useRef<HTMLFormElement>(null);

  const isSubmitting = fetcher.state === "submitting";
  const actionData = fetcher.data;

  // 4. Add an effect to reset the form after a successful submission
  useEffect(() => {
    if (fetcher.state === "idle" && actionData?.success) {
      formRef.current?.reset();
    }
  }, [fetcher.state, actionData]);

  return (
    <div className="container max-w-2xl py-8">
      <Card className="mx-6">
        <CardHeader>
          <CardTitle className="text-2xl">Posts</CardTitle>
        </CardHeader>
        <CardContent>
          {/* 3. Use fetcher.Form instead of the global Form */}
          <fetcher.Form ref={formRef} method="post" className="flex gap-2 mb-6">
            <Input
              name="text"
              placeholder="Write a new post..."
              disabled={isSubmitting}
              aria-invalid={actionData?.error ? true : undefined}
              aria-describedby={actionData?.error ? "post-error" : undefined}
            />
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Plus className="h-4 w-4" />
              )}
              <span className="ml-2">Post</span>
            </Button>
            {actionData?.error && (
              <div id="post-error" className="text-destructive text-sm mt-2">
                {actionData.error}
              </div>
            )}
          </fetcher.Form>

          <ul className="space-y-2">
            {posts.map((post) => (
              <li
                key={post.id}
                className="flex items-center justify-between p-3 rounded-lg border bg-card"
              >
                <span>{post.text}</span>
              </li>
            ))}
            {posts.length === 0 && (
              <EmptyPage message={"No posts yet. Write one above!"} />
            )}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
