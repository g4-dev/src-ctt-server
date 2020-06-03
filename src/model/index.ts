import { dso } from "../config.ts";
import { UserModel } from "./UserModel.ts";
import { TranscriptModel } from "./TranscriptModel.ts";

// yield entities;
export const user = dso.define(UserModel),
  transcript = dso.define(TranscriptModel);
// yield Models separatly
export { UserModel, TranscriptModel };

export { dso };
