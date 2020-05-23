import { DB_CONNECTION } from "./env.ts";
import { dso } from "https://deno.land/x/dso@v1.0.0/mod.ts";

export const client = await dso.connect(DB_CONNECTION);
