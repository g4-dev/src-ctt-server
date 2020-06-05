import { TranscriptArea } from "../areas/index.ts";
import { Log } from "../middlewares/log.ts";
import { AppSettings } from "../deps.ts";

export const container: AppSettings = {
  areas: [TranscriptArea],
  middlewares: [Log],
  logging: false,
};
