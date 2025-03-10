import { useQuery } from "@tanstack/react-query";
import client from "../../api/http.ts";
import PostItem from "../../components/PostItem/PostItem.tsx";
import { ChangeEvent, useState } from "react";
import { SortBy, TopSortBy } from "../../types.ts";
import SortingActions from "../../components/SortingActions/SortingActions.tsx";
import Pagination from "../../components/Pagination/Pagination.tsx";

const Profile = () => {
  const [sortBy, setSortBy] = useState<SortBy>("New");
  const [timeSort, setTimeSort] = useState<TopSortBy>(undefined);
  const [page, setPage] = useState(0);
  const { data, isPending } = useQuery({
    queryKey: ["profilePosts", page, { sort: sortBy, timeSort }],
    queryFn: async () => {
      const { data } = await client.GET("/api/users/posts", {
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
  if (isPending) {
    return <div>Loading...</div>;
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
      {data?.posts.map((post) => (
        <PostItem
          hubName={post.hub}
          page={page}
          timeSort={timeSort}
          sortBy={sortBy}
          key={post.postId}
          {...post}
        />
      ))}
    </div>
  );
};
export default Profile;
