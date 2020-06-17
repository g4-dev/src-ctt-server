import { MiddlewareTarget, Context, Middleware, CorsBuilder } from "../deps.ts";

@Middleware(new RegExp("^/"))
export class Log implements MiddlewareTarget<unknown> {
  date: Date = new Date();
  ip: string = "";
  method: string = "GET";
  url: string = "/";

  onPreRequest(context: Context<unknown>) {
    return new Promise((resolve, reject) => {
      this.date = new Date();
      this.ip = JSON.stringify(context.request.serverRequest.conn.remoteAddr);
      this.method = context.request.method;
      this.url = context.request.url;
      resolve();
    });
  }

  onPostRequest(context: Context<unknown>) {
    return new Promise((resolve, reject) => {
      console.info(
        `[${this.date.toString()}] [Duration: ${new Date().getTime() -
          this.date.getTime()}]\n${
          JSON.stringify(
            {
              ip: this.ip,
              method: this.method,
              url: this.url,
            },
          )
        }`,
      );
      resolve();
    });
  }
}
