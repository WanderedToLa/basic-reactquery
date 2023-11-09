import { useState } from "react";
import { PostDetail } from "./PostDetail";
import { usePosts } from "../hooks/usePots";
import { PostsType } from "~/@types";
import { Button } from "@chakra-ui/react";

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
 * 쓸 때 데이터 타이핑 -> 제네릭에 전달
 */

const maxPostPage = 10;

export function Posts() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState<PostsType | null>(null);
  const { posts } = usePosts(currentPage);

  // const queryClient = useQueryClient();
  // useEffect(() => {
  //   if (currentPage < maxPostPage) {
  //     const nextPage = currentPage + 1;
  //     queryClient.prefetchQuery({
  //       queryKey: ["posts", nextPage],
  //       queryFn: () => usePosts(nextPage),
  //     });
  //   }
  // }, [currentPage]);

  return (
    <>
      <ul>
        {posts?.data.map((post: PostsType) => (
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
        <Button
          disabled={currentPage <= 1}
          onClick={() => {
            setCurrentPage((prev) => prev - 1);
          }}
        >
          Previous page
        </Button>
        <span>Page {currentPage}</span>
        <Button
          disabled={currentPage >= maxPostPage}
          onClick={() => {
            setCurrentPage((prev) => prev + 1);
          }}
        >
          Next page
        </Button>
      </div>
      <hr />
      {selectedPost && <PostDetail post={selectedPost} />}
    </>
  );
}
