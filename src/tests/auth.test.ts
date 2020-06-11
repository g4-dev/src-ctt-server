import { assertEquals } from "./deps.ts";
import { startServer, killServer } from "./test.utils.ts";
import { IP, PORT } from "../env.ts";
import { IUser } from "../model/index.ts";
import { soxa } from "./test.utils.ts";

const { test } = Deno;

const baseUrl = `http://${IP}:${PORT}/`;
const testUser: IUser = {
  name: "test",
  token: "",
  isMasterKey: false,
};
let masterKey = "";

/**
 * Test cases
 */
test({
  name: "[AUTH] Test master Key",
  async fn(): Promise<void> {
    await startServer("./app.ts");

    try {
      const masterKeyRequest = await fetch(
        baseUrl + "users/create?name=master",
        // {
        //   headers: { master_key: masterKey },
        // },
      );
      console.info(masterKeyRequest);
      assertEquals(masterKeyRequest.status, 200);
      //masterKey = masterKey.t

      // Suite
      //   assertEquals(allTxt, "");
      //   assertEquals(get.status, 200);
    } finally {
      killServer();
    }
  },
});

// test({
//   name: "[AUTH] Tests User CRULD",
//   async fn(): Promise<void> {
//     await startServer("./app.ts");

//     try {
//       const response = await fetch(baseUrl + "transcripts/1");
//       //const text = await response.text();

//       assertEquals(response.status, 404);
//       //assertEquals(text, "Hey! john");
//     } finally {
//       killServer();
//     }
//   },
// });

// /**
//  * Test Home with auth
//  */
// test({
//   name: "[TRANSCRIPTS] Test Home response",
//   async fn(): Promise<void> {
//     await startServer("./app.ts");

//     try {
//       const home = await fetch(baseUrl);
//       const homeLogged = await fetch(baseUrl + "/login");
//       // Suite
//       assertEquals(home.status, 403);
//       // need auth
//       assertEquals(homeLogged.status, 200);
//       assertEquals(homeLogged, { message: "Welcome to Call2Text Api" });
//     } finally {
//       killServer();
//     }
//   },
// });
