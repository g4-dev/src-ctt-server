import { isHttpError, Status, STATUS_TEXT } from "../../deps.ts";

export const handler = async (
  { response }: { response: any },
  next: Function,
) => {
  try {
    await next();
  } catch (err) {
    console.log(err);
    if (isHttpError(err)) {
      console.log(err);
      switch (err.status) {
        case Status.NotFound:
          console.log("e");
          response.body = { error: STATUS_TEXT.get(Status.NotFound) };
          break;
        default:
          response.body = { error: err.message };
      }
    } else {
      throw err;
    }
  }
};
