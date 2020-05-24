import { User } from "./User.ts";
import { dso } from "https://deno.land/x/dso@v1.0.0/mod.ts";
export const user = dso.define(User);
