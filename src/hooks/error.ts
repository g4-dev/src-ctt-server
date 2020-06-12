import { Context, HttpError, Content, Singleton, HookTarget } from "../deps.ts";

type PayloadType = string[];

@Singleton()
export class CatchHook implements HookTarget<unknown, PayloadType> {
  onCatchAction(context: Context<unknown>, payload: PayloadType) {
    const error = context.response.error as HttpError;
    console.error("Entered in error", error);

    (error as any)["description"] = error.message || "Error during request";
    context.response.result = Content(error, error.httpCode || 500);
  }
}
