import { useLoaderData, useParams } from "react-router-dom";
import styles from "./Post.module.css";
import { PostDetailType, PostParams } from "../../types.ts";
import HubInfo from "../../components/HubInfo/HubInfo.tsx";
import PostDetail from "../../components/PostDetail/PostDetail.tsx";
import NewComment from "../../components/NewComment/NewComment.tsx";
import { useQuery } from "@tanstack/react-query";
import client from "../../api/http.ts";
import Comment from "../../components/Comment/Comment.tsx";
import { useAuth } from "../../context/AuthContext.tsx";
import Pagination from "../../components/Pagination/Pagination.tsx";
import { useState } from "react";
const Post = () => {
  const params = useParams() as PostParams;
  const { state } = useAuth();
  const [page, setPage] = useState(0);
  const query = useQuery({
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
  const { post, hub } = useLoaderData() as PostDetailType;
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <PostDetail {...post} />
        {state.user !== null && <NewComment page={page} />}
        <Pagination page={page} setPage={setPage} />
        {query.data?.map((comment) => {
          return <Comment key={comment.commentId} {...comment}></Comment>;
        })}
        <Pagination page={page} setPage={setPage} />
      </div>

      <HubInfo {...hub} />
    </div>
  );
};
export default Post;
