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
