import { dso } from "../db.ts";
// En
import { User } from "./User.ts";
import { Transcript } from "./Transcript.ts";

// yield entities;
export const user = dso.define(User),
  transcript = dso.define(Transcript);

export { dso };
