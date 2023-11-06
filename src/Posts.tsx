import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { PostDetail } from "./PostDetail";

const maxPostPage = 10;

async function fetchPosts() {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=10&_page=0"
  );
  return response.json();
}

export function Posts() {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedPost, setSelectedPost] = useState<any | null>(null);

  /**
   * isFetching: 비동기 쿼리가 해결되지 않은상태
   * isLoading: isFetching의 하위집합이고 캐시된 데이터가 없음을 의미함
   *
   * react query는 기본적으로 에러가 발생시 3번재시도 한 후에 데이터를 가져올수 없다고 결정함.
   */
  const { status, error, data } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  if (status === "pending") return <h3>Loading...</h3>;
  if (status === "error") return <h3>{error.toString()}</h3>;

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
        <button disabled onClick={() => {}}>
          Previous page
        </button>
        <span>Page {currentPage + 1}</span>
        <button disabled onClick={() => {}}>
          Next page
        </button>
      </div>
      <hr />
      {selectedPost && <PostDetail post={selectedPost} />}
    </>
  );
}
