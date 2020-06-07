import { Area } from "../../deps.ts";
import { TranscriptController } from "./transcriptController.ts";

@Area({
  baseRoute: "/transcripts",
  controllers: [TranscriptController],
})
export class TranscriptArea {}
