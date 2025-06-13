import { createPost } from "@/services/posts-api";
import { addPost } from "@/stores/posts-store";

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

    // You can also update the store here if needed
    addPost(newPost);

    return { success: true, post: newPost };
  } catch (error) {
    return {
      error: "Failed to create post",
      cause: error,
    };
  }
}
