import { persistentAtom } from "@nanostores/persistent";
import type { PostType } from "@/types/post-types";

const DEBUG = false;

const defaultPosts: PostType[] = [];
const storageKey = "posts";

export const $posts = persistentAtom<PostType[]>(storageKey, defaultPosts, {
  encode: JSON.stringify,
  decode: JSON.parse,
});

export function addPost(post: PostType) {
  $posts.set([...$posts.get(), post]);
}

if (DEBUG) {
  import("@nanostores/logger").then(({ logger }) => {
    logger({ $posts });
  });
}
