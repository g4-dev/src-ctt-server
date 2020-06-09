import { assertEquals } from "./deps.ts";
import { startServer, killServer } from "./test.utils.ts";
import { IP, PORT } from "../env.ts";
const { test } = Deno;

const baseUrl = `http://${IP}:${PORT}/`;

/**
 * Test cases
 */
test({
  name: "[TRANSCRIPTS] Test crud",
  async fn(): Promise<void> {
    await startServer("./app.ts");

    try {
      const all = await fetch(baseUrl + "transcripts");
      const allTxt = await response.text();
      const get = await fetch(baseUrl + "transcripts/1");
      // Suite
      assertEquals(all.status, 200);
      assertEquals(allTxt, "Hey! john");
      assertEquals(get.status, 200);
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
      const response = await fetch(baseUrl + "transcripts/1");
      //const text = await response.text();

      assertEquals(response.status, 404);
      //assertEquals(text, "Hey! john");
    } finally {
      killServer();
    }
  },
});
