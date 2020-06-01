import { dso } from "model/index.ts";
import { conn } from "@/config.ts";

(async () => {
  console.info("Updating Schema...");
  conn();
  await dso.sync(true);
})();
