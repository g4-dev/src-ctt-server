import {
  WebSocket,
  isWebSocketCloseEvent,
  isWebSocketPingEvent,
} from "./deps.ts";
import { readLines, StringReader } from "./deps.ts";

const transcripts = new Map<string, WebSocket>();
//export const BOUNDARY = "\n---ws---\n";
const uploadDir = "./uploads/transcripts";

async function broadcast(message: string, senderId: string): Promise<void> {
  if (!message) return;
  for (const transcript of transcripts.values()) {
    transcript.send(senderId ? `[${senderId}] : ${message}` : message);
    console.log(message);
    const encoder = new TextEncoder();
    await Deno.writeFile(senderId, new Uint8Array());

    // Write each lines in file
    for await (const line of readLines(new StringReader(message))) {
      const data = encoder.encode(line + "\n");
      await Deno.writeFile(
        `${uploadDir}/${senderId}.txt`,
        data,
        { append: true },
      );
    }
  }
}

export async function text(ws: WebSocket | undefined) {
  if (!ws) {
    throw new Error("Websocket refused");
  }
  const uuid = "test";
  //ws.headers.get("uuid");

  // Register user connection
  transcripts.set(uuid, ws);
  console.log(`> Object with : ${uuid} is in progress`);

  try {
    // Wait for new messages
    console.log(ws);
    // TODO: Bad resource ID
    for await (const event of ws) {
      console.log("ev", event);
      const message = typeof event === "string" ? event : "";

      broadcast(message, uuid);

      // Unregister user conection
      if (!message && isWebSocketCloseEvent(event)) {
        transcripts.delete(uuid);
        console.log(`Disconnected ${uuid}`);
        break;
      }
    }
  } catch (e) {
    if (!ws.isClosed) {
      ws.close(1000).catch(console.error);
    }
  }
}
