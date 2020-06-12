import {
  Controller,
  Get,
  Patch,
  Post,
  Body,
  Param,
  UseHook,
  NotFoundError,
  Context,
} from "../../deps.ts";
import { Transcript, ITranscript } from "../../model/index.ts";
import { TokenHook } from "../../hooks/auth.ts";
import { CatchHook } from "../../hooks/error.ts";
import { UploadHook, PayloadType } from "../../modules/upload/hook.ts";

const transcriptUploadOptions: PayloadType = {
  path: "",
  extensions: ["jpg", "png"],
  maxSizeBytes: 10000000,
  maxFileSizeBytes: -1,
  saveFile: true,
  readFile: false,
  useCurrentDir: true,
};

@UseHook(TokenHook)
@UseHook(CatchHook)
@Controller()
export class TranscriptController {
  @Get()
  async getAll() {
    return await Transcript.all();
  }

  @Post()
  async add(@Body() data: ITranscript) {
    return { data: await Transcript.create(data as any), transcript: data };
  }

  @Patch("/update/:id")
  async update(@Param("id") id: number, @Body() data: ITranscript) {
    return await Transcript.where("id", id).update(data as any);
  }

  @Get("/:id")
  async getOne(@Param("id") id: string) {
    const transcript = await Transcript.find(id as any);
    if (!transcript) {
      throw new NotFoundError();
    }
    return transcript;
  }

  @UseHook(UploadHook, transcriptUploadOptions)
  @Post("/save-audio")
  async saveAudio(context: any) {
    return context.uploadedFiles;
  }
}
