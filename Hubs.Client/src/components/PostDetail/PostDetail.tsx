import { PostDto } from "../../types.ts";
import styles from "./PostDetail.module.css";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
const PostDetail = (props: PostDto) => {
  dayjs.extend(relativeTime);

  return (
    <div className={styles.post}>
      <div className={styles["post-content"]}>
        <div className={styles.details}>
          <p>{props.author.username}</p> |
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
      </div>
    </div>
  );
};
export default PostDetail;
