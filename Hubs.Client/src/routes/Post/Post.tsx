import { useLoaderData } from "react-router-dom";
import styles from "./Post.module.css";
import { PostDetailType } from "../../types.ts";
import HubInfo from "../../components/HubInfo/HubInfo.tsx";
import PostDetail from "../../components/PostDetail/PostDetail.tsx";
const Post = () => {
  const { post, hub } = useLoaderData() as PostDetailType;
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <PostDetail {...post} />
      </div>

      <HubInfo {...hub} />
    </div>
  );
};
export default Post;
