import type { PostType } from "@/types/post-types";

const API_URL = import.meta.env.VITE_API_URL;

console.log("API_URL", API_URL);

const getPosts = async (): Promise<PostType[]> => {
  const response = await fetch(`${API_URL}/posts`);
  return response.json();
};

const createPost = async (post: PostType): Promise<PostType> => {
  const response = await fetch(`${API_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });
  return response.json();
};

export { getPosts, createPost };
