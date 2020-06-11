import { MiddlewareTarget, Context, Middleware } from "../deps.ts";

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
      console.log(new Date().getTime() - this.date.getTime());
      resolve();
    });
  }
}
