import { Router } from "https://deno.land/x/oak/mod.ts";

import {
  getAll,
  getDetails,
  add,
  update,
  remove,
} from "../controllers/user/index.ts";

const router = new Router();

router
  .get("/users", getAll)
  .get("/user/:id", getDetails)
  .post("/user", add)
  .put("/user/:id", update)
  .delete("/user/:id", remove);

export default router;
// TODO: issue with router definition, to google
