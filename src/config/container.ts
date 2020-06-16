import "./initDb.ts";
import { TranscriptArea, AuthArea } from "../areas/index.ts";
import { Log, Cors } from "../middlewares/index.ts";
import { AppSettings } from "../deps.ts";
import { HomeArea } from "../areas/home/homeArea.ts";

export const container: AppSettings = {
  areas: [AuthArea, TranscriptArea, HomeArea],
  middlewares: [Log],
  logging: false,
};
