import { getPosts } from "@/services/posts-api";
import { setPosts } from "@/stores/posts-store";

export async function loader() {
  const posts = await getPosts();

  // In case you want to cache the data in the store, you can do it here.
  setPosts(posts);
  
  return { posts };
}
