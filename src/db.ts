import { dso } from "https://deno.land/x/dso@v1.0.0/mod.ts";
import { DB } from "./config.ts";
// configure
dso.showQueryLog = true;
export const conn = (): any => dso.connect(DB);
// Expose all db mapping
export { dso };
