import { assert } from "./deps.ts";

let server: any;

//const FIRST_MESSAGE: string = "INFO load deno";

export async function createServer(
  serverPath: string = "./app.ts",
) {
  const serverPromise = Deno.run({
    env: {
      DB_TYPE: "sqlite3",
      IP: "http://127.0.0.1:9015",
    },
    cmd: [
      Deno.execPath(),
      "run",
      "-A",
      "--unstable",
      "--config",
      "./tsconfig.app.json",
      serverPath,
    ],
    stdout: "inherit",
    stderr: "inherit",
  });

  return new Promise(() => serverPromise);
}

export async function startServer(): Promise<void> {
  server = await createServer();
}

export function killServer(): void {
  server.kill(server.pid);
  server.close();
  (server.stdout as any)?.close();
}

export function itLog(s: string, firstIt = false): void {
  firstIt ? console.log("\n" + s) : console.log(s);
}
