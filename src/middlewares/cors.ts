import { MiddlewareTarget, Context, Middleware } from "../deps.ts";

@Middleware(new RegExp("^/"))
export class Cors implements MiddlewareTarget<unknown> {
  onPreRequest(context: Context<unknown>) {
    return new Promise((resolve, reject) => {
      context.request.headers.set("Access-Control-Allow-Origin", "*");
      context.request.headers.set("Access-Control-Allow-Methods", "*");
      resolve();
    });
  }

  onPostRequest(context: Context<unknown>) {
    return new Promise((resolve, reject) => {
      context.request.headers.set("Access-Control-Allow-Origin", "*");
      context.request.headers.set("Access-Control-Allow-Methods", "*");
      resolve();
    });
  }
}
