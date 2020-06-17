import "./initDb.ts";
import { TranscriptArea, AuthArea } from "../areas/index.ts";
import { Log } from "../middlewares/index.ts";
import { AppSettings } from "../deps.ts";
import { HomeArea } from "../areas/home/homeArea.ts";
import { APP_DEBUG } from "../env.ts";

export const container: AppSettings = {
  areas: [AuthArea, TranscriptArea, HomeArea],
  middlewares: [Log],
  logging: Boolean(APP_DEBUG),
};
