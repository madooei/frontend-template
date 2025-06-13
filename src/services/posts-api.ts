import type { PostType } from "@/types/post-types";
import { env } from "@/env";

const getPosts = async (): Promise<PostType[]> => {
  const response = await fetch(`${env.API_URL}/posts`);
  return response.json();
};

const createPost = async (post: PostType): Promise<PostType> => {
  const response = await fetch(`${env.API_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });
  return response.json();
};

export { getPosts, createPost };
