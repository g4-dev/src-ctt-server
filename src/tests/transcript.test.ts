import { assertEquals } from "./deps.ts";
import { startServer, killServer } from "./test.utils.ts";
import { APP_HOST, APP_PORT } from "../env.ts";
const { test } = Deno;

const baseUrl = `http://${APP_HOST}:${APP_PORT}/`;

/**
 * Test cases
 */
test({
  name: "[http] default server should response 200, 404",
  async fn(): Promise<void> {
    await startServer("./app.ts");

    try {
      const r1 = await fetch(baseUrl + "/transcripts");
      await r1.body.close();
      assertEquals(r1.status, 404);
    } finally {
      killServer();
    }
  },
});

test({
  name: "[http] Transcript server should respond 404",
  async fn(): Promise<void> {
    await startServer("./app.ts");

    try {
      const response = await fetch(baseUrl + "/transcripts/1");
      //const text = await response.text();

      assertEquals(response.status, 404);
      //assertEquals(text, "Hey! john");
    } finally {
      killServer();
    }
  },
});
