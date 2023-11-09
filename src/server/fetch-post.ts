import { server } from "./axios";

export async function fetchPosts(pageNumber: number) {
  const data = await server.get(`posts?_limit=10&_page=${pageNumber}`);
  return data;
}
