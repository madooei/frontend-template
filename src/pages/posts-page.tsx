import {
  useLoaderData,
  useActionData,
  useNavigation,
  Form,
} from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Plus } from "lucide-react";
import type { PostType } from "@/types/post-types";
import { getPosts, createPost } from "@/services/posts-api";

// This is our loader function that will be used by React Router
export async function loader() {
  const posts = await getPosts();
  return { posts };
}

// This is our action function that will handle form submissions
export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const text = formData.get("text") as string;

  if (!text?.trim()) {
    return { error: "Post text is required" };
  }

  try {
    const newPost = await createPost({
      id: Date.now(),
      text: text.trim(),
    });
    return { success: true, post: newPost };
  } catch (error) {
    return { error: "Failed to create post" };
  }
}

const PostsPage: React.FC = () => {
  const { posts } = useLoaderData() as { posts: PostType[] };
  const actionData = useActionData() as
    | { error?: string; success?: boolean }
    | undefined;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="container max-w-2xl py-8">
      <Card className="mx-6">
        <CardHeader>
          <CardTitle className="text-2xl">Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <Form method="post" className="flex gap-2 mb-6">
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
          </Form>

          {actionData?.error && (
            <div id="post-error" className="text-destructive text-sm mb-4">
              {actionData.error}
            </div>
          )}

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
              <li className="text-center text-muted-foreground py-4">
                No posts yet. Write one above!
              </li>
            )}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default PostsPage;
