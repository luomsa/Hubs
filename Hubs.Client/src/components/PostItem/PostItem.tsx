import { PostDto } from "../../types.ts";
import styles from "./PostItem.module.css";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
const PostItem = (props: PostDto) => {
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
        <p className={styles.title}>
          <Link className={styles.url} to={props.url}>
            {props.title}
          </Link>
        </p>
        {props.type === "Image" ? (
          <img className={styles.img} alt={"image"} src={props.content} />
        ) : (
          <p>{props.content}</p>
        )}
      </div>
    </div>
  );
};
export default PostItem;
