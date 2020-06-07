import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  Res,
  QueryParam,
  UseHook,
} from "../../deps.ts";
import { Transcript, ITranscript } from "../../model/index.ts";
import { TokenHook } from "../../hooks/auth.ts";

@UseHook(TokenHook)
@Controller()
export class TranscriptController {
  @Get()
  getAll() {
    return "List transcript";
  }

  @Post()
  async add(@Body(Transcript) data: ITranscript) {
    return {
      data,
      errors: data, ///await validate(data),
    };
  }

  @Post("/update/:id")
  async update(id: string, values: ITranscript) {
    await Transcript.where("id", id).update(values as any);
    return this.getOne(id);
  }

  @Get("/:id")
  getOne(
    @QueryParam("id") id: string,
    @Req() request: Request | undefined = undefined,
    @Res() response: Response | undefined = undefined,
  ) {
    return { text: id };
  }
}
