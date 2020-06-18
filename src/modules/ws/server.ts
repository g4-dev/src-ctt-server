import {
  acceptWebSocket,
  acceptable,
} from "./deps.ts";

/** websocket base server */
export function ws(req: any): Promise<any> {
  try {
    if (!acceptable(req)) {
      throw new Error("Non acceptable websocket");
    }

    const { conn, r: bufReader, w: bufWriter, headers } = req;

    return acceptWebSocket({
      conn,
      bufReader,
      bufWriter,
      headers,
    });
  } catch (err) {
    throw err;
  }
}
