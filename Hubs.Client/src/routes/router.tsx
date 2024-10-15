import { createBrowserRouter } from "react-router-dom";
import App from "../App.tsx";
import Home from "./Home.tsx";
import Popular from "./Popular.tsx";
import SubmitPost from "./SubmitPost/SubmitPost.tsx";
import Hub from "./Hub/Hub.tsx";
import Post from "./Post/Post.tsx";
import ProtectedRoute from "../components/ProtectedRoute.tsx";
import HubErrorBoundary from "../components/HubErrorBoundary.tsx";
import Authenticate from "./Authenticate/Authenticate.tsx";
import { hubLoader, postLoader } from "./loaders.ts";

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
        path: "/authenticate",
        element: <Authenticate />,
      },
      {
        path: "/popular",
        element: <Popular />,
      },
      {
        path: "/hub/:name",
        loader: hubLoader,
        element: <Hub />,
        // errorElement: <div>This hub doesn't exist</div>,
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
        loader: postLoader,
        element: <Post />,
        errorElement: <HubErrorBoundary />,
      },
    ],
    errorElement: <HubErrorBoundary />,
  },
]);
export default router;
