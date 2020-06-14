import { assertEquals } from "./deps.ts";
import { startServer, killServer, itLog } from "./test.utils.ts";
import { IP, PORT } from "../env.ts";
import { IUser } from "../model/index.ts";
import { soxa } from "./deps.ts";

const { test } = Deno;

soxa.defaults.baseURL = `http://${IP}:${PORT}`;
//soxa.defaults.headers.common['Authorization'] = AUTH_TOKEN;

const testUser: IUser = {
  name: "test",
  token: "",
  isMasterKey: false,
};
let masterKey = "";

// test({
//   name: "[AUTH] Test protected route",
//   async fn(): Promise<void> {
//     await startServer("./app.ts");

//     try {
//       const home = await soxa.get("/");
//       logger(home);
//       assertEquals(home.status, 403);
//     } finally {
//       killServer();
//     }
//   },
// });

/**
 * Test cases
 */
test({
  name: "[AUTH] Test master Key followed by user CRULD",
  async fn(): Promise<void> {
    await startServer();

    try {
      itLog("/ : home auth protected route");

      const home = await soxa.get("/");
      assertEquals(home.status, 403);
      const masterKeyRequest = await soxa.get("/users/create?name=master", {
        headers: { master_key: masterKey },
      });

      itLog("/users/create : create master key");

      assertEquals(masterKeyRequest.status, 200);
      masterKey = masterKeyRequest.user.data;
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

export { masterKey, soxa };
