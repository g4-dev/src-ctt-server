import { Area } from "@/deps.ts";
import { TranscriptController } from "./transcriptController.ts";

@Area({
  controllers: [TranscriptController],
})
export class TranscriptArea {}
