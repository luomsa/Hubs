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
const Post = () => {
  const params = useParams() as PostParams;
  const auth = useAuth();
  const query = useQuery({
    queryKey: ["comment", params.postId],
    queryFn: async () => {
      const { data } = await client.GET("/api/posts/{postId}/comments", {
        params: { path: { postId: params.postId } },
      });
      console.log("data", data);
      return data;
    },
  });
  const { post, hub } = useLoaderData() as PostDetailType;
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <PostDetail {...post} />
        {auth.user !== null && <NewComment />}
        {query.data?.map((comment) => {
          return <Comment key={comment.commentId} {...comment}></Comment>;
        })}
      </div>

      <HubInfo {...hub} />
    </div>
  );
};
export default Post;
