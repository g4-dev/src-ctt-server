import {
  WebSocket,
  isWebSocketCloseEvent,
} from "./deps.ts";
import { v4, readLines, StringReader } from "./deps.ts";

const transcripts = new Map<string, WebSocket>();
//export const BOUNDARY = "\n---ws---\n";
const uploadDir = "./uploads/transcripts";

async function broadcast(message: string, senderId: string): Promise<void> {
  if (!message) return;
  for (const transcript of transcripts.values()) {
    transcript.send(senderId ? `[${senderId}] : ${message}` : message);

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
  const transcriptUUID = v4.generate();

  if (!ws) {
    return;
  }

  // Register user connection
  transcripts.set(transcriptUUID, ws);
  console.log(`> Transcript with : ${transcriptUUID} is in progress`);

  // Wait for new messages
  for await (const event of ws) {
    const message = typeof event === "string" ? event : "";

    broadcast(message, transcriptUUID);

    // Unregister user conection
    if (!message && isWebSocketCloseEvent(event)) {
      transcripts.delete(transcriptUUID);
      console.log(`Disconnected ${transcriptUUID}`);
      break;
    }
  }
}
