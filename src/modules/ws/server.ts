import {
  acceptWebSocket,
  acceptable,
} from "./deps.ts";

/** websocket base server */
export const ws = async (req: any) => {
  try {
    const { conn, r: bufReader, w: bufWriter, headers } = req;
    if (!acceptable(req)) {
      throw new Error("Refused websocket");
    }

    return acceptWebSocket({
      conn,
      bufReader,
      bufWriter,
      headers,
    });
  } catch (err) {
    console.error(`failed to accept websocket: ${err}`);
    await req.respond({ status: 400 });
  }
};
