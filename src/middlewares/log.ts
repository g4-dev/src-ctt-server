import { MiddlewareTarget, Context, Middleware } from "../deps.ts";

@Middleware(new RegExp("/"))
export class Log implements MiddlewareTarget<unknown> {
  date: Date = new Date();

  onPreRequest(context: Context<unknown>) {
    context.request.headers.set("Access-Control-Allow-Origin", "*");
    context.request.headers.set("Access-Control-Allow-Methods", "*");
    return new Promise((resolve, reject) => {
      this.date = new Date();
      resolve();
    });
  }

  onPostRequest(context: Context<unknown>) {
    context.request.headers.set("Access-Control-Allow-Origin", "*");
    context.request.headers.set("Access-Control-Allow-Methods", "*");
    return new Promise((resolve, reject) => {
      console.log(new Date().getTime() - this.date.getTime());
      resolve();
    });
  }
}
