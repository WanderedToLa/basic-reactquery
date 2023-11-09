import { Button } from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";

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

async function updatePost(postId: number) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: "PATCH" }
  );
  return response.json();
}

interface PostDetailProps {
  post: { userId: number; id: number; title: string; body: string };
}

export function PostDetail({ post }: PostDetailProps) {
  //useQuery자체로 effect처럼 동작하는?

  const { data } = useQuery({
    queryKey: ["post-detail", post.id],
    queryFn: () => fetchComments(post.id),
  });

  const deleteMutationPost = useMutation({
    mutationFn: (postId) => deletePost(postId),
  });

  return (
    <>
      <h3 style={{ color: "blue", fontSize: "24px" }}>{post.title}</h3>
      <Button>Delete</Button>
      <Button>Update title</Button>
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
