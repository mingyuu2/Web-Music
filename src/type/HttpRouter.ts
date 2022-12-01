import { RequestHandler } from "express";

type HttpMethod = "all" | "get" | "post" | "put" | "delete" | "patch" | "options" | "head";

interface HttpRouter {
    handler: RequestHandler;
    method: HttpMethod;
    path: string;
}

export default HttpRouter;
