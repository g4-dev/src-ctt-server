// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.
import { serve } from "https://deno.land/std/http/server.ts";
import {
  acceptWebSocket,
  isWebSocketCloseEvent,
  isWebSocketPingEvent,
  WebSocket,
} from "https://deno.land/std/ws/mod.ts";
import { WS_PORT } from "../../env.ts";

const transcripts = new Map<string, WebSocket>();
let currentUuid: any;

async function handleWs(sock: WebSocket) {
  console.log(`${currentUuid} transcript...`);
  transcripts.set(currentUuid, sock);
  try {
    for await (const ev of sock) {
      if (typeof ev === "string") {
        console.log("ws:txt", ev);
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
        transcripts.delete(currentUuid);
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
    currentUuid = headers.get("uuid") ||
      req.url.split("?uuid=").pop();
    //!transcripts.get(currentUuid)
    if (!currentUuid) {
      await req.respond({ status: 204, body: "No corresponding UUID setted" });
      continue;
    }

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
