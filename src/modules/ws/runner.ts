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

type Ws = Map<string, WebSocket>;
type Instance = Map<string, Ws>;
/**
 * Uniform Websockets connections
 */
const ws: Ws = new Map<string, WebSocket>();
/**
 * Instance associate websockets to a common id
 */
const instances: Instance = new Map<string, Map<string, WebSocket>>();
// Keep in context ids
let instanceUuid: string;
let wsUuid: string;
// Possible Origins
let fromIa = false;
let fromUi = false;

/**
 * Send message to all concerned websockets
 * @param message
 */
function broadcast(message: string = "empty message"): void {
  const websockets = instances.get(instanceUuid);
  if (!websockets) return;
  for (const websocket of websockets.values()) {
    websocket.send(instanceUuid ? `[${instanceUuid}]\n${message}` : message);
  }
  console.info("sent : ", message);
}

async function handleWs(sock: WebSocket) {
  if (!instanceUuid) {
    await sock.send(`wrong ${instanceUuid}`);
    return true;
  }
  console.info(`${instanceUuid} transcript...`);
  if (fromUi) {
    // associate ws with their maps
    ws.set(wsUuid, sock);
    instances.set(instanceUuid, ws);
  }

  try {
    for await (const ev of sock) {
      if (typeof ev === "string") {
        if (fromIa) {
          sock.send(ev);
        }
        broadcast(ev);
      } else if (isWebSocketPingEvent(ev)) {
        const [, body] = ev;
        console.log("ws:ping : ", body);
      } else if (!ev && isWebSocketCloseEvent(ev)) {
        ws.delete(instanceUuid);
        const { code, reason } = ev;
        broadcast(`${instanceUuid} closed`);
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
    // recognize origin
    fromIa = headers.get("uuid") !== null;
    fromUi = req.url.split("?uuid=").pop() !== null;

    const payloadUuid = headers.get("uuid") ||
      req.url.split("?uuid=").pop();
    // Define identifier for current object
    if (payloadUuid) {
      instanceUuid = payloadUuid;
      wsUuid = v4.generate();
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
