import {
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { PostDetail } from "./PostDetail";

/**
 * isFetching: 비동기 쿼리가 해결되지 않은상태
 * isLoading: isFetching의 하위집합이고 캐시된 데이터가 없음을 의미함
 *
 * react query는 기본적으로 에러가 발생시 3번재시도 한 후에 데이터를 가져올수 없다고 결정함.
 *
 * Prefetch - 데이터에 캐시 추가, 기본적으로 stale한 상태
 * 캐시가 만료되지 않았다는 가정하에 데이터를 다시 가져오는 도중에 캐시된 데이터를 보여줌
 *
 * Mutation - useQuery와 유사 return mutate function querykey가 필요하지 않음
 * no isFetching , by default no retries
 */

interface Posts {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const maxPostPage = 10;

async function fetchPosts(pageNumber: number) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${pageNumber}`
  );
  return response.json();
}

export function Posts() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState<Posts | null>(null);

  const queryClient = useQueryClient();

  const { data } = useSuspenseQuery({
    queryKey: ["posts", currentPage],
    queryFn: () => fetchPosts(currentPage),
  });

  useEffect(() => {
    if (currentPage < maxPostPage) {
      const nextPage = currentPage + 1;
      queryClient.prefetchQuery({
        queryKey: ["posts", nextPage],
        queryFn: () => fetchPosts(nextPage),
      });
    }
  }, [currentPage]);

  return (
    <>
      <ul>
        {data?.map((post: any) => (
          <li
            key={post.id}
            className="post-title"
            onClick={() => setSelectedPost(post)}
          >
            {post.title}
          </li>
        ))}
      </ul>
      <div className="pages">
        <button
          disabled={currentPage <= 1}
          onClick={() => {
            setCurrentPage((prev) => prev - 1);
          }}
        >
          Previous page
        </button>
        <span>Page {currentPage}</span>
        <button
          disabled={currentPage >= maxPostPage}
          onClick={() => {
            setCurrentPage((prev) => prev + 1);
          }}
        >
          Next page
        </button>
      </div>
      <hr />
      {selectedPost && <PostDetail post={selectedPost} />}
    </>
  );
}
