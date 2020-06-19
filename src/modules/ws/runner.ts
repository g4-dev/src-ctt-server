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

// ws_uuid => ws
const ws = new Map<string, WebSocket>();
let currentUuid: any;
let transcriptUuid: any;

async function handleWs(sock: WebSocket) {
  currentUuid = v4.generate();
  console.log(`${currentUuid} transcript...`);
  // transcript_uuid => ws_uuid
  // ws_uuid => ws
  ws.set(currentUuid, sock);

  try {
    for await (const ev of sock) {
      if (typeof ev === "string") {
        console.log("ws:txt", ev);
        for (const w of ws.values()) {
          await w.send(`[${transcriptUuid}] \n${ev}`);
        }
        await sock.send(ev);
      } else if (ev instanceof Uint8Array) {
        // binary message
        console.log("ws:binary : ", ev);
      } else if (isWebSocketPingEvent(ev)) {
        const [, body] = ev;
        // ping
        console.log("ws:ping : ", body);
      } else if (isWebSocketCloseEvent(ev)) {
        // close
        ws.delete(currentUuid);
        const { code, reason } = ev;
        console.log("ws:close : ", code, reason);
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
      req.url.split("?uuid=").pop();

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
