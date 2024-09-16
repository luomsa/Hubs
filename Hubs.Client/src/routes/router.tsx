import { createBrowserRouter } from "react-router-dom";
import App from "../App.tsx";
import Home from "./Home.tsx";
import client from "../api/http.ts";
import Popular from "./Popular.tsx";
import SubmitPost from "./SubmitPost/SubmitPost.tsx";
import Hub from "./Hub/Hub.tsx";
import Post from "./Post/Post.tsx";
import ProtectedRoute from "../components/ProtectedRoute.tsx";
import HubErrorBoundary from "../components/HubErrorBoundary.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/popular",
        element: <Popular />,
      },
      {
        path: "/hub/:name",
        loader: async ({ params }) => {
          if (params.name === undefined) {
            throw new Error("No hub name provided");
          }
          const { data } = await client.GET(`/api/hubs/{name}`, {
            params: {
              path: { name: params.name },
            },
          });
          return data;
        },
        element: <Hub />,
        errorElement: <div>This hub doesn't exist</div>,
      },
      {
        path: "/hub/:name/submit",
        element: (
          <ProtectedRoute>
            <SubmitPost />
          </ProtectedRoute>
        ),
        errorElement: <HubErrorBoundary />,
      },
      {
        path: "/hub/:name/:postId/:slug",
        loader: async ({ params }) => {
          if (
            params.name == null ||
            params.postId == null ||
            params.slug == null
          ) {
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
        },
        element: <Post />,
        errorElement: <HubErrorBoundary />,
      },
    ],
    errorElement: <HubErrorBoundary />,
  },
]);
export default router;
