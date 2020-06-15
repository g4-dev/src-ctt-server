import { assert } from "./deps.ts";

let server: Deno.Process;

//const FIRST_MESSAGE: string = "INFO load deno";

export async function startServer(
  serverPath: string = "./app.ts",
) {
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
    stderr: "piped",
  });

  const { code } = await server.status();
  console.log(code);
  if (code === 0) {
    const rawOutput = await server.output();
    await Deno.stdout.write(rawOutput);
  } else {
    const rawError = await server.stderrOutput();
    const errorString = new TextDecoder().decode(rawError);
    console.log(errorString);
  }

  //assert();

  return Promise.resolve();
}

export function killServer(): void {
  server.close();
  (server.stdout as any)?.close();
}

export function itLog(s: string, firstIt = false): void {
  firstIt ? console.log("\n" + s) : console.log(s);
}
