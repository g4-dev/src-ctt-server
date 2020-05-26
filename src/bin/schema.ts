import { dso } from "https://deno.land/x/dso@v1.0.0/mod.ts";
import "../config/db.ts";

(async () => await dso.sync(true))();
