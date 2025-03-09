import { useLoaderData, useParams } from "react-router-dom";
import styles from "./Post.module.css";
import { HubDto, PostDto, PostParams } from "../../types.ts";
import HubInfo from "../../components/HubInfo/HubInfo.tsx";
import PostDetail from "../../components/PostDetail/PostDetail.tsx";
import NewComment from "../../components/NewComment/NewComment.tsx";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import client from "../../api/http.ts";
import Comment from "../../components/Comment/Comment.tsx";
import { useAuth } from "../../context/AuthContext.tsx";
import Pagination from "../../components/Pagination/Pagination.tsx";
import { useState } from "react";
const Post = () => {
  const params = useParams() as PostParams;
  const { state } = useAuth();
  const [page, setPage] = useState(0);
  const queryClient = useQueryClient();
  const { data, isPending } = useQuery({
    queryKey: ["comment", page, params.postId],
    queryFn: async () => {
      const { data } = await client.GET("/api/posts/{postId}/comments", {
        params: {
          path: { postId: params.postId },
          query: {
            page: page,
          },
        },
      });
      return data;
    },
  });
  const { data: post, isPending: postIsPending } = useQuery({
    queryKey: ["post", page, params.postId],
    queryFn: async () => {
      const { data } = await client.GET("/api/posts/{postId}", {
        params: {
          path: { postId: Number(params.postId) },
        },
      });
      return data;
    },
  });
  const mutation = useMutation({
    mutationFn: async ({ postId, type }: { postId: string; type: string }) => {
      await client.POST("/api/posts/{postId}/vote", {
        params: {
          path: { postId: postId },
          query: { type: type as unknown as "Like" | "Dislike" | undefined },
        },
      });
    },
    onSuccess: (_result, variables) => {
      queryClient.setQueryData(
        ["post", page, params.postId],
        (old: PostDto) => {
          return old.postId.toString() === variables.postId
            ? {
                ...post,
                userVoteType: variables.type,
                voteCount:
                  variables.type === "Like" ? ++old.voteCount : --old.voteCount,
              }
            : post;
        },
      );
    },
  });

  const hub = useLoaderData() as HubDto;
  const handleVote = (postId: string, type: string) => {
    mutation.mutate({ postId, type });
  };
  if (isPending && postIsPending) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.content}>Loading...</div>
        <HubInfo {...hub} />
      </div>
    );
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        {post && <PostDetail post={post} handleVote={handleVote} />}
        {state.user !== null && <NewComment page={page} />}
        {page === 0 && data?.comments.length === 0 ? null : (
          <Pagination page={page} setPage={setPage} hasMore={!!data?.hasMore} />
        )}
        {data?.comments.map((comment) => {
          return <Comment key={comment.commentId} {...comment}></Comment>;
        })}
        {data?.comments.length == 0 && <div>No comments yet</div>}
        {page === 0 && data?.comments.length === 0 ? null : (
          <Pagination page={page} setPage={setPage} hasMore={!!data?.hasMore} />
        )}
      </div>

      <HubInfo {...hub} />
    </div>
  );
};
export default Post;
