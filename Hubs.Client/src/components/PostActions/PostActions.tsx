import styles from "./PostActions.module.css";
import {
  IconArrowBigDown,
  IconArrowBigDownFilled,
  IconArrowBigUp,
  IconArrowBigUpFilled,
} from "@tabler/icons-react";
import { PostDto } from "../../types.ts";
import { useAuth } from "../../context/AuthContext.tsx";
type Props = Pick<PostDto, "voteCount" | "userVoteType"> & {
  onVote: (postId: string, type: string) => void;
  postId: string;
};
const PostActions = ({ voteCount, userVoteType, onVote, postId }: Props) => {
  const { state } = useAuth();
  return (
    <div className={styles.actions}>
      <button
        onClick={() => onVote(postId, "Like")}
        disabled={userVoteType !== null || state.user === null}
      >
        {userVoteType === "Like" ? (
          <IconArrowBigUpFilled />
        ) : (
          <IconArrowBigUp />
        )}
      </button>
      <span>{voteCount}</span>
      <button
        onClick={() => onVote(postId, "Dislike")}
        disabled={userVoteType !== null || state.user === null}
      >
        {userVoteType === "Dislike" ? (
          <IconArrowBigDownFilled />
        ) : (
          <IconArrowBigDown />
        )}
      </button>
    </div>
  );
};
export default PostActions;
