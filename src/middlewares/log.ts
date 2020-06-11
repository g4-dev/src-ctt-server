import { MiddlewareTarget, Context, Middleware, CorsBuilder } from "../deps.ts";

@Middleware(new RegExp("^/"))
export class Log implements MiddlewareTarget<unknown> {
  date: Date = new Date();

  onPreRequest(context: Context<unknown>) {
    return new Promise((resolve, reject) => {
      this.date = new Date();
      resolve();
    });
  }

  onPostRequest(context: Context<unknown>) {
    return new Promise((resolve, reject) => {
      console.log(context.response.headers);
      console.log(new Date().getTime() - this.date.getTime());
      resolve();
    });
  }
}
