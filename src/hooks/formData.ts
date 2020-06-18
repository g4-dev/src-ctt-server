import { Singleton, BadRequestError, Context, HookTarget } from "../deps.ts";
import { MultipartReader } from "../deps.ts";

@Singleton()
export class FormDataHook implements HookTarget<unknown, unknown> {
  async onPreAction(context: Context<unknown>, payload: unknown) {
    const req = context.request.serverRequest;
    const body: any = req.body;
    const contentType: any = req.headers.get("content-type");

    if (contentType === null) {
      throw new BadRequestError(
        "This endpoint expects a different type of body.",
      );
    }

    const boundary = contentType.match(/boundary=([^\s]+)/)[1];

    const reader = new MultipartReader(body, boundary);
    const form = await reader.readForm();

    const data: {
      [key: string]: any;
    } = {};

    for (const [key, value] of form.entries()) {
      data[key] = value;
    }

    (context as any).request.formData = data;
  }
}
