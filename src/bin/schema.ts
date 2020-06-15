import { db } from "../config/initDb.ts";

(async (force: boolean = Boolean(Deno.args[0])) => {
  console.info("Updating Schema...", "force drop :", force);
  await db.sync({ drop: force || false });
})();
