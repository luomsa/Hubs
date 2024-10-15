import { Middleware } from "openapi-fetch";
import router from "../routes/router.tsx";
import { ApiError } from "./http.ts";

const myMiddleware: Middleware = {
  async onRequest({ request }) {
    return request;
  },
  async onResponse({ response }) {
    if (!response.ok) {
      const responseBody = await response.json();
      if (responseBody.title === "Session expired") {
        const destination = new URLSearchParams({
          destination: window.location.pathname,
        });
        await router.navigate(`/authenticate?${destination.toString()}`);
      }
      throw new ApiError(responseBody.title);
    }
    return response;
  },
};
export default myMiddleware;
