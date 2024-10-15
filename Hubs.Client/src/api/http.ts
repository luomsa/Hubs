import createClient from "openapi-fetch";
import type { paths } from "./schema";
export class ApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ApiError";
  }
}

const client = createClient<paths>();

export default client;
