import { MiddlewareTarget, Context, Middleware } from "../deps.ts";

@Middleware(new RegExp("^/"))
export class Cors implements MiddlewareTarget<unknown> {
  private headers: Map<string, string>;
  private allowAnyOrigin: boolean;
  private allowAnyMethod: boolean;
  private allowAnyHeader: boolean;
  private allowCredentials: boolean;

  constructor() {
    this.headers = new Map();
    this.allowAnyOrigin = true;
    this.allowAnyMethod = true;
    this.allowAnyHeader = true;
    this.allowCredentials = true;
  }

  onPreRequest(context: Context<unknown>): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.allowAnyOrigin) {
        this.headers.set(
          "Access-Control-Allow-Origin",
          context.request.headers.get("Origin") || "",
        );
      }
      if (this.allowAnyMethod) {
        this.headers.set(
          "Access-Control-Allow-Methods",
          context.request.headers.get(
            "Access-Control-Request-Method",
          ) ||
            "POST, GET, OPTIONS, PUT, DELETE",
        );
      }
      if (this.allowAnyHeader) {
        this.headers.set(
          "Access-Control-Allow-Headers",
          context.request.headers.get("Access-Control-Request-Headers") ||
            "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization",
        );
      }

      if (this.allowCredentials) {
        this.headers.set(
          "Access-Control-Allow-Credentials",
          context.request.headers.get("Access-Control-Allow-Credentials") ||
            "true",
        );
      }

      if (context.request.method == "OPTIONS") {
        this.onPostRequest(context);

        context.response.status = 200;
        context.response.setImmediately();
      }

      this.headers.forEach((el, key) => {
        context.response.headers.set(key, el);
      });

      resolve();
    });
  }

  onPostRequest(context: Context<unknown>): Promise<void> {
    return new Promise((resolve, rej) => {
      this.headers.forEach((el, key) => {
        context.response.headers.set(key, el);
      });
      resolve();
    });
  }

  WithOrigins(origins: string) {
    this.headers.set("Access-Control-Allow-Origin", origins);
    return this;
  }

  WithMethods(methods: string) {
    this.headers.set("Access-Control-Allow-Methods", methods);
    return this;
  }

  WithHeaders(headers: string) {
    this.headers.set("Access-Control-Allow-Headers", headers);
    return this;
  }

  BlockAnyOrigin() {
    this.allowAnyOrigin = false;
    return this;
  }

  BlockAnyMethod() {
    this.allowAnyMethod = false;
    return this;
  }

  BlockAnyHeader() {
    this.allowAnyHeader = false;
    return this;
  }

  BlockCredentials() {
    this.allowCredentials = false;
    return this;
  }
}
