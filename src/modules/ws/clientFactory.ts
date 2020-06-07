import { wsCli } from "./client.ts";
// Yield clients
function getWs(url: string, port: number = 8080) {
  Deno.args[0] = url;
  Deno.args[1] = String(port);
  return wsCli;
}

// Userful ressources
// https://aralroca.com/blog/learn-deno-chat-app
