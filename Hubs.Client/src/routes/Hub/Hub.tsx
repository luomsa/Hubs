import {
  useLoaderData,
  useNavigate,
  useParams,
  useRevalidator,
} from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { HubDto, HubParams, PostDto, SortBy, TopSortBy } from "../../types.ts";
import client from "../../api/http.ts";
import HubInfo from "../../components/HubInfo/HubInfo.tsx";
import styles from "./Hub.module.css";
import PostItem from "../../components/PostItem/PostItem.tsx";
import Button from "../../components/ui/Button/Button.tsx";
import { useAuth } from "../../context/AuthContext.tsx";
import { ChangeEvent, useState } from "react";
import PostActions from "../../components/PostActions/PostActions.tsx";
import Pagination from "../../components/Pagination/Pagination.tsx";
import toast from "react-hot-toast";

const Hub = () => {
  const hub = useLoaderData() as HubDto;
  const { name } = useParams() as HubParams;
  const revalidator = useRevalidator();
  const { state, dispatch } = useAuth();
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState<SortBy>("New");
  const [timeSort, setTimeSort] = useState<TopSortBy>(undefined);
  const [page, setPage] = useState(0);
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ["hubPosts", hub.name, page, { sort: sortBy, timeSort }],
    queryFn: async () => {
      const { data } = await client.GET("/api/hubs/{name}/posts", {
        params: {
          path: { name },
          query: { page, sort: sortBy, time: timeSort },
        },
      });
      return data;
    },
  });
  const joinHub = async () => {
    try {
      const { data } = await client.POST("/api/hubs/{name}/join", {
        params: {
          path: {
            name: hub.name,
          },
        },
      });
      revalidator.revalidate();
      if (
        state.user !== null &&
        state.user !== undefined &&
        data !== undefined
      ) {
        dispatch({ type: "update_hub", payload: data });
      }
    } catch {
      toast.error("Couldn't join hub, try again later.");
    }
  };
  const leaveHub = async () => {
    try {
      await client.POST("/api/hubs/{name}/leave", {
        params: {
          path: {
            name: hub.name,
          },
        },
      });
      revalidator.revalidate();
      if (state.user !== null && state.user !== undefined) {
        const updatedHubs = state.user.joinedHubs.filter(
          (h) => h.name !== hub.name,
        );
        dispatch({ type: "update_hubs", payload: updatedHubs });
      }
    } catch {
      toast.error("Couldn't leave hub, try again later.");
    }
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    const sort = event.target.value as SortBy;
    if (sort === "New") {
      setSortBy(event.target.value as SortBy);
      setTimeSort(undefined);
    } else if (sort === "Top") {
      setSortBy(event.target.value as SortBy);
      setTimeSort("Day");
    }
  };
  const handleTimeSort = (event: ChangeEvent<HTMLSelectElement>) => {
    setTimeSort(event.target.value as TopSortBy);
  };

  const mutation = useMutation({
    mutationFn: async ({ postId, type }: { postId: string; type: string }) => {
      await client.POST("/api/posts/{postId}/vote", {
        params: {
          path: { postId: postId },
          query: { type: type as unknown as "Like" | "Dislike" | undefined },
        },
      });
    },
    onSuccess: (_result, variables) => {
      queryClient.setQueryData(
        ["hubPosts", hub.name, page, { sort: sortBy, timeSort }],
        (old: PostDto[]) => {
          return old.map((post) => {
            return post.postId.toString() === variables.postId
              ? {
                  ...post,
                  userVoteType: variables.type,
                  voteCount:
                    variables.type === "Like"
                      ? ++post.voteCount
                      : --post.voteCount,
                }
              : post;
          });
        },
      );
    },
  });

  const handleVote = (postId: string, type: string) => {
    mutation.mutate({ postId, type });
  };
  return (
    <div>
      <div className={styles["hub-header"]}>
        <h1>{hub.name}</h1>
        {state.user !== null && (
          <div className={styles["hub-buttons"]}>
            <Button onClick={() => navigate("submit")}>Create a post</Button>
            {hub.isJoined ? (
              <Button onClick={leaveHub}>Leave</Button>
            ) : (
              <Button onClick={joinHub}>Join</Button>
            )}
          </div>
        )}
      </div>
      <div className={styles.sort}>
        <select value={sortBy} onChange={handleSort}>
          <option value="New">New</option>
          <option value="Top">Top</option>
        </select>
        {sortBy === "Top" && (
          <select value={timeSort} onChange={handleTimeSort}>
            <option value="Hour">Hour</option>
            <option value="Day">Day</option>
            <option value="Week">Week</option>
            <option value="Month">Month</option>
            <option value="Year">Year</option>
            <option value="AllTime">All time</option>
          </select>
        )}
      </div>
      <Pagination page={page} setPage={setPage} />
      <div className={styles.wrapper}>
        <div className={styles.content}>
          {query.data?.map((post) => {
            return (
              <PostItem
                page={page}
                timeSort={timeSort}
                sortBy={sortBy}
                key={post.postId}
                {...post}
              >
                <PostActions
                  postId={post.postId.toString()}
                  voteCount={post.voteCount}
                  userVoteType={post.userVoteType}
                  onVote={handleVote}
                />
              </PostItem>
            );
          })}
          {query.data?.length === 0 && <p>No posts found</p>}
        </div>
        <HubInfo {...hub} />
      </div>
      <Pagination page={page} setPage={setPage} />
    </div>
  );
};
export default Hub;
