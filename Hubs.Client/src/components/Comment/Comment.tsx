import { CommentDto } from "../../types.ts";
import styles from "./Comment.module.css";
import dayjs from "dayjs";
const Comment = (props: CommentDto) => {
  return (
    <div className={styles.comment}>
      <div className={styles.details}>
        <p>{props.author}</p>|
        <time
          dateTime={props.createdAt}
          title={new Date(props.createdAt).toString()}
        >
          {dayjs(props.createdAt).fromNow()}
        </time>
      </div>
      <p>{props.content}</p>
    </div>
  );
};
export default Comment;
