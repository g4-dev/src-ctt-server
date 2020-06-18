import { assert, TextProtoReader, BufReader } from "./deps.ts";

let server: Deno.Process;

const FIRST_MESSAGE: string = "INFO load deno";

export async function startServer(
  serverPath: string = "./app.ts",
): Promise<any> {
  server = Deno.run({
    env: {
      DB_TYPE: "sqlite3",
    },
    cmd: [
      Deno.execPath(),
      "run",
      "-A",
      "--config",
      "./tsconfig.app.json",
      "--unstable",
      serverPath,
    ],
    stdout: "piped",
    stderr: "inherit",
  });

  // Once process is ready it will write to its stdout.
  assert(server.stdout != null);
  const r = new TextProtoReader(new BufReader(server.stdout as any));
  let s = await r.readLine();
  assert(s !== null && s.includes(FIRST_MESSAGE));

  return Promise.resolve();
}

export function killServer(): void {
  server.close();
  (server.stdout as any)?.close();
}
