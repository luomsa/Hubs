import {createBrowserRouter} from "react-router-dom";
import App from "../App.tsx";
import Home from "./Home.tsx";
import client from "../api/http.ts";
import Hub from "./Hub.tsx";
import Popular from "./Popular.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [{
            path: "",
            element: <Home/>,
        }, {
            path: "/popular",
            element: <Popular/>
        }, {
            path: "/hub/:name",
            loader: async ({params}) => {
                if (params.name == null) {
                    throw new Error("No hub name provided");
                }
                const {data} = await client.GET(`/api/hubs/{name}`, {
                    params: {
                        path: {name: params.name}
                    }
                });
                return data;
            },
            element: <Hub/>,
            errorElement: <div>This hub doesn't exist</div>
        }]
    }
]);
export default router;