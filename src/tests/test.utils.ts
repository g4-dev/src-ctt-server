import { assert, TextProtoReader, BufReader } from "./deps.ts";

let server: Deno.Process;

export async function startServer(
  serverPath: string = "./app.ts",
): Promise<void> {
  server = Deno.run({
    env: {
      DB_TYPE: "sqlite3",
    },
    cmd: [
      Deno.execPath(),
      "run",
      "-A",
      "--config",
      "tsconfig.app.json",
      "--unstable",
      serverPath,
    ],
    stdout: "piped",
    stderr: "inherit",
  });

  try {
    // Once server is ready it will write to its stdout.
    assert(server.stdout != null);

    const r = new TextProtoReader(new BufReader(server.stdout as any));
    let s = await r.readLine();

    console.log(s);
    assert(s !== null && s.includes("Server start in"));
  } catch (e) {
    throw e;
  }

  return Promise.resolve();
}

export function killServer(): void {
  Deno.kill(server.pid, Deno.Signal.SIGKILL);
  server.close();
  (server.stdout as any)?.close();
}

export function itLog(s: string, firstIt = false): void {
  firstIt ? console.log("\n" + s) : console.log(s);
}
