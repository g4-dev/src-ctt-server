import { startServer, killServer } from "./test.utils.ts";
import { assertEquals } from "./deps.ts";
import { IP, PORT } from "../env.ts";
import { IUser } from "../model/index.ts";
import { soxa } from "./deps.ts";

const { test } = Deno;

soxa.defaults.baseURL = `http://${IP}:${PORT}`;
soxa.defaults.validateStatus = function (status: number) {
  return status < 500; // Reject only if the status code is greater than or equal to 500
};

const testUser: IUser = {
  name: "test",
  token: "",
  master: false,
};
let masterKeySave = "";

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
  name: "[AUTH] Setup",
  async fn(): Promise<void> {
    await startServer();
    setTimeout(() => {}, 300);

    try {
      // test auth protection
      const home = await soxa.get("/");
      assertEquals(
        home.status,
        403,
        "[/] (home} : Authentication protection",
      );

      // create master key (user)
      const masterKey = await soxa.get("/users/create?name=master");
      console.log(masterKey);
      assertEquals(
        masterKey.status,
        200,
        "[/users/create] (master init) : Master key should be created",
      );
      masterKeySave = masterKey.data.user.token;
      console.log(masterKeySave);

      // login with master
      const masterLogin = await soxa.post("/login", {
        token: masterKeySave,
        name: "master",
      });
      console.log(masterLogin);
      soxa.defaults.headers.common["Authorization"] = masterLogin.data.token;
      assertEquals(
        masterLogin.status,
        200,
        "[/login] : Master key can request token",
      );

      // access home with new valid token
      const homeLogged = await soxa.get("/");
      assertEquals(homeLogged.status, 200);
      assertEquals(
        homeLogged.data,
        { message: "Welcome to Call2Text Api" },
        "[/] (home) : Should be logged",
      );
    } finally {
      killServer();
    }
  },
});

test({
  name: "[AUTH] User CRULD",
  async fn(): Promise<void> {
    await startServer();
    setTimeout(() => {}, 300);
    try {
      const userCreate = await soxa.get(`/users/create?name=${testUser.name}`, {
        headers: { master_key: masterKeySave },
      });
      assertEquals(
        userCreate.status,
        200,
        "User should be created",
      );
    } finally {
      killServer();
    }
  },
});

export { masterKeySave, soxa };
