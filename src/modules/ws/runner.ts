import { ws } from "./server.ts";
import { listenAndServe } from "https://deno.land/std/http/server.ts";

listenAndServe({ port: 8082 }, async (req) => {
  ws(req);
});
