import { PostDto, SortBy, TopSortBy } from "../../types.ts";
import styles from "./PostItem.module.css";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { ReactNode } from "react";
type Props = PostDto & {
  hubName: string;
  page: number;
  sortBy: SortBy;
  timeSort: TopSortBy;
  children: ReactNode;
};
const PostItem = (props: Props) => {
  dayjs.extend(relativeTime);

  return (
    <div className={styles.wrapper}>
      <div className={styles.post}>
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
        <div className={styles.title}>
          <Link className={styles.url} to={props.url}>
            {props.title}
          </Link>
        </div>
        <div className={styles.content}>
          {props.type === "Image" ? (
            <img
              loading={"lazy"}
              className={styles.img}
              alt={"image"}
              src={props.content}
            />
          ) : (
            <p>
              {props.content.length > 500
                ? props.content.substring(0, 500) + "..."
                : props.content}
            </p>
          )}
        </div>
        {props.children}
      </div>
    </div>
  );
};
export default PostItem;
