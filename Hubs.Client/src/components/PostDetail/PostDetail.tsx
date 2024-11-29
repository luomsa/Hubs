import { PostDto } from "../../types.ts";
import styles from "./PostDetail.module.css";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useAuth } from "../../context/AuthContext.tsx";
import client, { ApiError } from "../../api/http.ts";
import { useRevalidator } from "react-router-dom";

const PostDetail = (props: PostDto) => {
  dayjs.extend(relativeTime);
  const { state } = useAuth();
  const validator = useRevalidator();
  const handleDelete = async () => {
    try {
      await client.DELETE(`/api/posts/{postId}`, {
        params: { path: { postId: props.postId.toString() } },
      });
      validator.revalidate();
    } catch {}
  };
  return (
    <div className={styles.post}>
      <div className={styles["post-content"]}>
        <div className={styles.details}>
          {<p>{props.author?.username ?? "[deleted]"}</p>}|
          <time
            className={styles.time}
            title={new Date(props.createdAt).toString()}
            dateTime={props.createdAt}
          >
            {dayjs(props.createdAt).fromNow()}
          </time>
        </div>
        <h2 className={styles.title}>{props.title}</h2>
        {props.type === "Image" ? (
          <img alt={"image"} src={props.content} />
        ) : (
          <p>{props.content}</p>
        )}
        {(state.user?.joinedHubs.find((h) => h.name === props.hub)
          ?.isModerator === true ||
          state.user?.userId === props.author?.userId) && (
          <button className={styles["delete-btn"]} onClick={handleDelete}>
            Delete
          </button>
        )}
      </div>
    </div>
  );
};
export default PostDetail;
