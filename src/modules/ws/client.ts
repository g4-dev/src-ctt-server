import {
  connectWebSocket,
  isWebSocketCloseEvent,
  isWebSocketPingEvent,
  isWebSocketPongEvent,
} from "./deps.ts";
import { encode } from "./deps.ts";
import { BufReader } from "./deps.ts";
import { TextProtoReader } from "./deps.ts";
import { blue, green, red, yellow } from "./deps.ts";

export const wsCli = async () => {
  const endpoint = `ws://${Deno.args[0] || "127.0.0.1"}:${Deno.args[1] ||
    8080}`;
  /** simple websocket cli */
  try {
    const sock = await connectWebSocket(endpoint);
    console.log(green("ws connected! (type 'close' to quit)"));

    const messages = async (): Promise<void> => {
      for await (const msg of sock) {
        if (typeof msg === "string") {
          console.log(yellow(`< ${msg}`));
        } else if (isWebSocketPingEvent(msg)) {
          console.log(blue("< ping"));
        } else if (isWebSocketPongEvent(msg)) {
          console.log(blue("< pong"));
        } else if (isWebSocketCloseEvent(msg)) {
          console.log(red(`closed: code=${msg.code}, reason=${msg.reason}`));
        }
      }
    };

    const cli = async (): Promise<void> => {
      const tpr = new TextProtoReader(new BufReader(Deno.stdin));
      while (true) {
        await Deno.stdout.write(encode("> "));
        const line = await tpr.readLine();
        if (line === null || line === "close") {
          break;
        } else if (line === "ping") {
          await sock.ping();
        } else {
          await sock.send(line);
        }
      }
    };

    await Promise.race([messages(), cli()]).catch(console.error);

    if (!sock.isClosed) {
      await sock.close(1000).catch(console.error);
    }
  } catch (err) {
    console.error(red(`Could not connect to WebSocket: '${err}'`));
  }

  Deno.exit(0);
};
