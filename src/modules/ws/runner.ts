// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.
import { serve } from "https://deno.land/std/http/server.ts";
import {
  acceptWebSocket,
  isWebSocketCloseEvent,
  isWebSocketPingEvent,
  WebSocket,
} from "https://deno.land/std/ws/mod.ts";
import { v4 } from "https://deno.land/std/uuid/mod.ts";
import { WS_PORT } from "../../env.ts";

// ws_uuid | transcript uuid => ws
const ws = new Map<string, WebSocket>();
let transcriptUuid: any;

function broadcast(message: string): void {
  console.info("sent : ", message);

  if (!message) return;
  for (const w of ws.values()) {
    w.send(transcriptUuid ? `[${transcriptUuid}]\n${message}` : message);
  }
}

async function handleWs(sock: WebSocket) {
  console.info(`${transcriptUuid} transcript...`);
  ws.set(transcriptUuid, sock);

  try {
    for await (const ev of sock) {
      if (typeof ev === "string") {
        broadcast(ev);
      } else if (isWebSocketPingEvent(ev)) {
        const [, body] = ev;
        console.log("ws:ping : ", body);
      } else if (!ev && isWebSocketCloseEvent(ev)) {
        ws.delete(transcriptUuid);
        const { code, reason } = ev;
        broadcast(`${transcriptUuid} closed`);
        console.log("ws:close : ", code, reason);
        break;
      }
    }
  } catch (err) {
    console.error(`failed to receive frame: ${err}`);

    if (!sock.isClosed) {
      await sock.close(1000).catch(console.error);
    }
  }
}

if (import.meta.main) {
  /** websocket echo server */
  const port = WS_PORT || "8082";
  for await (const req of serve(`:${port}`)) {
    const { conn, r: bufReader, w: bufWriter, headers } = req;
    transcriptUuid = headers.get("uuid") ||
      req.url.split("?uuid=").pop() || v4.generate();

    acceptWebSocket({
      conn,
      bufReader,
      bufWriter,
      headers,
    })
      .then(handleWs)
      .catch(async (err) => {
        console.error(`failed to accept websocket: ${err}`);
        await req.respond({ status: 400 });
      });
  }
}
