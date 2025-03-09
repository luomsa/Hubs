import { PostDto } from "../../types.ts";
import styles from "./PostDetail.module.css";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useAuth } from "../../context/AuthContext.tsx";
import client from "../../api/http.ts";
import { useRevalidator } from "react-router-dom";
import PostActions from "../PostActions/PostActions.tsx";

type Props = {
  post: PostDto;
  handleVote: (postId: string, type: string) => void;
};
const PostDetail = ({ post, handleVote }: Props) => {
  dayjs.extend(relativeTime);
  const { state } = useAuth();
  const validator = useRevalidator();
  const handleDelete = async () => {
    try {
      await client.DELETE(`/api/posts/{postId}`, {
        params: { path: { postId: post.postId.toString() } },
      });
      validator.revalidate();
    } catch {}
  };
  return (
    <div className={styles.post}>
      <div className={styles["post-content"]}>
        <div className={styles.details}>
          {<p>{post.author?.username ?? "[deleted]"}</p>}|
          <time
            className={styles.time}
            title={new Date(post.createdAt).toString()}
            dateTime={post.createdAt}
          >
            {dayjs(post.createdAt).fromNow()}
          </time>
        </div>
        <h2 className={styles.title}>{post.title}</h2>
        {post.type === "Image" ? (
          <img alt={"image"} src={post.content} />
        ) : (
          <p>{post.content}</p>
        )}
        <PostActions
          postId={post.postId.toString()}
          voteCount={post.voteCount}
          userVoteType={post.userVoteType}
          onVote={handleVote}
        />
        {(state.user?.joinedHubs.find((h) => h.name === post.hub)
          ?.isModerator === true ||
          state.user?.userId === post.author?.userId) && (
          <button className={styles["delete-btn"]} onClick={handleDelete}>
            Delete
          </button>
        )}
      </div>
    </div>
  );
};
export default PostDetail;
