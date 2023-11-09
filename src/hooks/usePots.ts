import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../react-query/queryKeys";
import { fetchPosts } from "../server/fetch-post";
import { PostsType } from "~/@types";

export function usePosts(pageNumber: number) {
  const { data: posts } = useQuery<PostsType[]>({
    queryKey: [QUERY_KEYS["posts"], pageNumber],
    queryFn: () => fetchPosts(pageNumber),
  });

  return { posts };
}
