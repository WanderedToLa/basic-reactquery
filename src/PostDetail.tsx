import { useQuery } from "@tanstack/react-query";

async function fetchComments(postId: any) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  );
  return response.json();
}

async function deletePost(postId: any) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: "DELETE" }
  );
  return response.json();
}

async function updatePost(postId: any) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: "PATCH" }
  );
  return response.json();
}

export function PostDetail(post: any) {
  //useQuery자체로 effect처럼 동작하는?

  const { isLoading, data } = useQuery({
    queryKey: ["post-detail", post.id],
    queryFn: () => fetchComments(post.id),
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <button>Delete</button> <button>Update title</button>
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data?.map((comment: any) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
