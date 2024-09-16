import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { HubDto, HubParams } from "../../types.ts";
import client from "../../api/http.ts";
import HubInfo from "../../components/HubInfo/HubInfo.tsx";
import styles from "./Hub.module.css";
import PostItem from "../../components/PostItem/PostItem.tsx";
import Button from "../../components/ui/Button/Button.tsx";
import { useAuth } from "../../context/AuthContext.tsx";
const Hub = () => {
  const hub = useLoaderData() as HubDto;
  const { name } = useParams() as HubParams;
  const auth = useAuth();
  const navigate = useNavigate();
  const query = useQuery({
    queryKey: ["hubPosts"],
    queryFn: async () => {
      const { data } = await client.GET("/api/hubs/{name}/posts", {
        params: { path: { name } },
      });
      console.log("data", data);
      return data;
    },
  });

  return (
    <div>
      <div className={styles["hub-header"]}>
        <h1>{hub.name}</h1>
        {auth.user !== null && (
          <div className={styles["hub-buttons"]}>
            <Button onClick={() => navigate("submit")}>Create a post</Button>
            <Button>Join</Button>
          </div>
        )}
      </div>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          {query.data?.map((post) => {
            return <PostItem key={post.postId} {...post} />;
          })}
        </div>
        <HubInfo {...hub} />
      </div>
    </div>
  );
};
export default Hub;
