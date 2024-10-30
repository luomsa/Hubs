import { ChangeEvent, useState } from "react";
import { PostDto, SortBy, TopSortBy } from "../../types.ts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import client from "../../api/http.ts";
import styles from "../Hub/Hub.module.css";
import Pagination from "../../components/Pagination/Pagination.tsx";
import PostItem from "../../components/PostItem/PostItem.tsx";
import PostActions from "../../components/PostActions/PostActions.tsx";
import SortingActions from "../../components/SortingActions/SortingActions.tsx";

const Popular = () => {
  const [sortBy, setSortBy] = useState<SortBy>("Top");
  const [timeSort, setTimeSort] = useState<TopSortBy>("Day");
  const [page, setPage] = useState(0);
  const queryClient = useQueryClient();
  const { data, isPending } = useQuery({
    queryKey: ["popularPosts", page, { sort: sortBy, timeSort }],
    queryFn: async () => {
      const { data } = await client.GET("/api/feed/popular", {
        params: {
          query: { page, sort: sortBy, time: timeSort },
        },
      });
      return data;
    },
  });
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
        ["popularPosts", page, { sort: sortBy, timeSort }],
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

  if (isPending) {
    return (
      <div>
        <SortingActions
          sortBy={sortBy}
          timeSort={timeSort}
          handleSort={handleSort}
          handleTimeSort={handleTimeSort}
        />
        <div className={styles.wrapper}>
          <div className={styles.content}>Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <SortingActions
        sortBy={sortBy}
        timeSort={timeSort}
        handleSort={handleSort}
        handleTimeSort={handleTimeSort}
      />
      {page === 0 && data?.posts.length === 0 ? null : (
        <Pagination page={page} setPage={setPage} hasMore={!!data?.hasMore} />
      )}
      <div className={styles.wrapper}>
        <div className={styles.content}>
          {data?.posts.map((post) => {
            return (
              <PostItem
                hubName={post.hub}
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
          {data?.posts.length === 0 && <p>No posts found</p>}
        </div>
      </div>
      {page === 0 && data?.posts.length === 0 ? null : (
        <Pagination page={page} setPage={setPage} hasMore={!!data?.hasMore} />
      )}
    </div>
  );
};
export default Popular;
