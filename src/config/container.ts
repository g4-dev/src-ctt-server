import "./initDb.ts";
import { TranscriptArea } from "../areas/index.ts";
import { Log } from "../middlewares/log.ts";
import { AppSettings } from "../deps.ts";
import { HomeArea } from "../areas/home/homeArea.ts";

export const container: AppSettings = {
  areas: [TranscriptArea, HomeArea],
  middlewares: [Log],
  logging: false,
};
