import { assert, TextProtoReader, BufReader } from "./deps.ts";

let server: Deno.Process;

export async function startServer(serverPath: string): Promise<void> {
  server = Deno.run({
    env: {
      DB_TYPE: "sqlite3",
    },
    cmd: [
      Deno.execPath(),
      "run",
      "-A",
      "--config",
      "../tsconfig.json",
      serverPath,
    ],
    stdout: "piped",
    stderr: "inherit",
  });
  // Once server is ready it will write to its stdout.
  assert(server.stdout != null);

  const r = new TextProtoReader(new BufReader(server.stdout));
  let s = await r.readLine();

  assert(s !== null && s.includes("Server start in"));

  return Promise.resolve();
}

export function killServer(): void {
  server.close();
  server.stdout?.close();
}

export function itLog(s: string, firstIt = false): void {
  firstIt ? console.log("\n" + s) : console.log(s);
}
