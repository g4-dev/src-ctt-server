import { Context, HttpError, Content, Singleton, HookTarget } from "../deps.ts";

type PayloadType = string[];

@Singleton()
export class CatchHook implements HookTarget<unknown, PayloadType> {
  onCatchAction(context: Context<unknown>, payload: PayloadType) {
    console.error("Entered in error");
    const error = context.response.error as HttpError;

    (error as any)["description"] = error.message || "Error during request";
    context.response.result = Content(error, error.httpCode || 500);
  }
}
