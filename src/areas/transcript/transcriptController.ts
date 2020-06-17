import {
  Controller,
  Get,
  Patch,
  Post,
  Body,
  Param,
  UseHook,
  NotFoundError,
  Req,
  QueryParam,
} from "../../deps.ts";
import { Transcript, ITranscript } from "../../model/index.ts";
import { TokenHook, CatchHook, FormDataHook } from "../../hooks/index.ts";
import {
  UploadHook,
  PayloadType,
  UploadContext,
} from "../../modules/upload/hook.ts";
import { ws } from "../../modules/ws/server.ts";
import { text } from "../../modules/ws/text.ts";

const transcriptUploadOptions: PayloadType = {
  path: "./uploads/audios",
  extensions: ["wav"],
  maxSizeBytes: -1,
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
    return await Transcript.where({ id: id }).update(data as any);
  }

  @Get("/:id")
  async getOne(@Param("id") id: string) {
    const transcript = await Transcript.find(id as any);
    if (!transcript) {
      throw new NotFoundError();
    }
    return transcript;
  }

  @UseHook(FormDataHook)
  @UseHook(UploadHook, transcriptUploadOptions)
  @Post("/save-audio")
  async saveAudio(
    @QueryParam("uuid") uuid: string,
    context: UploadContext<unknown>,
  ) {
    console.log(context.uploadedFiles);
    return context.uploadedFiles;
  }

  @Get("/socket")
  async socket(@Req() request: any) {
    console.log("Entered in websock");
    // appel bdd
    // create websocket server
    await ws(request).then(text);
    //await this.add(values);
  }
}
