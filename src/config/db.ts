import { dso } from "https://deno.land/x/dso@v1.0.0/mod.ts";
import { DB } from "./env.ts";

(async () => await dso.connect(DB))();
