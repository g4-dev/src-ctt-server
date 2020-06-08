import { Context, HttpError, Content, Singleton, HookTarget } from "../deps.ts";

type PayloadType = string[];

@Singleton()
export class CatchHook implements HookTarget<unknown, PayloadType> {
  onCatchAction(context: Context<unknown>, payload: PayloadType) {
    console.log("Entered catch hook");
    const error = context.response.error as HttpError;

    (error as any)["description"] = "This description from catch hook";
    context.response.result = Content(error, error.httpCode || 500);
  }
}
