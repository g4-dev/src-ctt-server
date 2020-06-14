import { assert, TextProtoReader, BufReader } from "./deps.ts";
export { soxa } from "https://deno.land/x/soxa/mod.ts";

let server: Deno.Process;

export async function startServer(serverPath: string): Promise<void> {
  server = Deno.run({
    env: {
      DB_TYPE: "sqlite3",
      IP: "http://127.0.0.1:9015",
    },
    cmd: [
      Deno.execPath(),
      "run",
      "-A",
      "--config",
      "tsconfig.json",
      "--unstable",
      serverPath,
    ],
    stdout: "inherit",
    stderr: "inherit",
  });
  // Once server is ready it will write to its stdout.
  assert(server.stdout != null);

  const r = new TextProtoReader(new BufReader(server.stdout as any));
  let s = await r.readLine();

  assert(s !== null && s.includes("Server start in"));

  return Promise.resolve();
}

export function killServer(): void {
  server.kill(server.pid);
  server.close();
  (server.stdout as any)?.close();
}

export function itLog(s: string, firstIt = false): void {
  firstIt ? console.log("\n" + s) : console.log(s);
}
