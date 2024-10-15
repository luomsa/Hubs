import { components } from "./api/schema";

export type PostType = components["schemas"]["PostType"];
export type NewPostRequest = components["schemas"]["NewPostRequest"];
export type PostDto = components["schemas"]["PostDto"];
export type HubDto = components["schemas"]["HubDto"];
export type PostDetailType = {
  post: PostDto;
  hub: HubDto;
};
export type CommentDto = components["schemas"]["CommentDto"];
export type HubParams = {
  name: string;
};

export type SortBy = "New" | "Top";
export type TopSortBy =
  | "Hour"
  | "Day"
  | "Week"
  | "Month"
  | "Year"
  | "AllTime"
  | undefined;
export type PostParams = {
  name: string;
  postId: string;
};
export type UserVoteType = Pick<PostDto, "userVoteType">;
export type HubSearchDto = components["schemas"]["HubSearchDto"];
export type NewCommentRequest = components["schemas"]["NewCommentRequest"];

export type SidebarHubDto = components["schemas"]["SidebarHubDto"];
