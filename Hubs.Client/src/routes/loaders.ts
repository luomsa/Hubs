import client from "../api/http.ts";

export const hubLoader = async ({ params }) => {
  if (params.name === undefined) {
    throw new Error("No hub name provided");
  }
  const { data } = await client.GET(`/api/hubs/{name}`, {
    params: {
      path: { name: params.name },
    },
  });
  return data;
};
export const postLoader = async ({ params }) => {
  if (params.name == null || params.postId == null || params.slug == null) {
    throw new Error("No parameters provided");
  }
  const { data: post } = await client.GET("/api/posts/{postId}", {
    params: {
      path: { postId: params.postId },
    },
  });
  const { data: hub } = await client.GET(`/api/hubs/{name}`, {
    params: {
      path: { name: params.name },
    },
  });
  return { post, hub };
};
