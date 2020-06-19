import {
  Controller,
  Get,
  Patch,
  Post,
  Body,
  Param,
  UseHook,
  NotFoundError,
  BadRequestError,
  Req,
  v4,
} from "../../deps.ts";
import { Transcript, ITranscript } from "../../model/index.ts";
import { TokenHook, CatchHook } from "../../hooks/index.ts";
import {
  UploadHook,
} from "../../modules/upload/hook.ts";

const transcriptUploadOptions: any = {
  path: "./uploads",
  extensions: ["wav", "txt"],
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
    data.uuid = v4.generate();
    return { data: await Transcript.create(data as any), transcript: data };
  }

  @Patch("/update/:id")
  async update(@Param("id") id: string, @Body() data: ITranscript) {
    return isNaN(Number(id))
      ? await Transcript.where("uuid", id).update(data as any)
      : await Transcript.where("id", id).update(data as any);
  }

  @Get("/:id")
  async getOne(@Param("id") id: string) {
    const transcript = isNaN(Number(id))
      ? await Transcript.where("uuid", id).first()
      : await Transcript.find(id as any);

    if (!transcript) {
      throw new NotFoundError();
    }

    return transcript;
  }

  /**
   * Upload a single audio for a transcript providing id / uuid
   * Upload associated text
   * Update transcript instance
   *
   * @param request {
   *    uploadedFiles : {
   *      uuid {
   *        url: string
   *        uri: string,
   *        mime: audio/wave
   *      }
   *    }
   * }
   */
  @UseHook(UploadHook, transcriptUploadOptions)
  @Post("/done")
  async saveAudio(@Req() request: any) {
    if (!request.uploadedFiles) {
      throw new BadRequestError("No files provided");
    }
    const transcriptId =
      request.uploadedFiles["text_file"].filename.split(".")[0];

    return await this.update(transcriptId, {
      audio_file: request.uploadedFiles["audio_file"].url,
      text_file: request.uploadedFiles["text_file"].url,
      status: "done",
    } as any);
  }

  @Post("/read-text")
  async readText(@Body() data: any) {
    if (!data.path) {
      throw new NotFoundError();
    }
    const decoder = new TextDecoder("utf-8");
    return decoder.decode(
      await Deno.readAll(await Deno.open(`./${data.path}`)),
    );
  }
}
