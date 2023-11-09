import { PostsType } from "~/@types";
import { server } from "./axios";

export async function fetchPosts(pageNumber: number) {
  const data = await server.get<PostsType[]>(
    `posts?_limit=10&_page=${pageNumber}`
  );
  return data;
}
