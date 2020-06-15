import { assert, TextProtoReader, BufReader } from "./deps.ts";

let server: Deno.Process;
const FIRST_MESSAGE: string = "INFO load deno";

export const startServer = async (
  serverPath: string = "./app.ts",
): Promise<unknown> => {
  server = Deno.run({
    env: {
      DB_TYPE: "sqlite3",
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
    stdout: "piped",
    stderr: "inherit",
  });

  let schema = Deno.run({
    env: {
      DB_TYPE: "sqlite3",
    },
    cmd: [
      Deno.execPath(),
      "run",
      "-A",
      "--unstable",
      "--config",
      "./tsconfig.app.json",
      "bin/schema.ts",
      "true", // force drop
    ],
    stdout: "piped",
    stderr: "inherit",
  });

  // server wait stdout
  assert(server.stdout != null);
  //let r = new TextProtoReader(new BufReader(server.stdout as any));
  //let s = await r.readLine();
  //assert(s !== null && s.includes(FIRST_MESSAGE));

  // Schema stdout
  assert(schema.stdout != null);
  //r = new TextProtoReader(new BufReader(schema.stdout as any));
  //s = await r.readLine();
  //assert(s !== null && s.includes(FIRST_MESSAGE));

  return Promise.resolve;
};

export function killServer(): void {
  server.close();
  (server.stdout as any)?.close();
}

export function itLog(s: string, firstIt = false): void {
  firstIt ? console.log("\n" + s) : console.log(s);
}
