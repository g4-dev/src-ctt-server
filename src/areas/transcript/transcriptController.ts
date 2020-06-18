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
import { ws } from "../../modules/ws/server.ts";
import { text } from "../../modules/ws/text.ts";
//import { acceptWebSocket } from "../../modules/ws/deps.ts";

const transcriptUploadOptions: any = {
  path: "./uploads/audios",
  extensions: ["wav"],
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
   * 
   * @param request {
   *    @param uploadedFiles : {
   *      @param uuid {
   *        url: string
   *        uri: string,
   *        mime: audio/wave
   *      } 
   *    }
   * }
   */
  @UseHook(UploadHook, transcriptUploadOptions)
  @Post("/save-audio")
  async saveAudio(
    @Req() request: any,
  ) {
    console.log("upd", request.uploadedFiles);
    if (!request.uploadedFiles) {
      throw new BadRequestError("No files provided");
    }
    const transcriptId = Object.keys(request.uploadedFiles)[0];

    return await this.update(transcriptId, {
      audio_file: request.uploadedFiles[transcriptId].url,
      status: "done",
    } as any);
  }

  // @Get("/socket")
  // async socket(context: any) {
  //   // appel bdd
  //   console.log(context);
  //   // create websocket server
  //   ws(context.request.serverRequest).then(text);
  // }
}
