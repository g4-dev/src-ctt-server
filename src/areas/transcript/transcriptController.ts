import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseHook,
  BadRequestError,
  NotFoundError,
} from "../../deps.ts";
import { Transcript, ITranscript } from "../../model/index.ts";
import { TokenHook } from "../../hooks/auth.ts";
import { CatchHook } from "../../hooks/error.ts";

@UseHook(TokenHook)
@UseHook(CatchHook)
@Controller()
export class TranscriptController {
  @Get()
  async getAll() {
    return { data: await Transcript.all() };
  }

  @Post()
  async add(@Body() data: ITranscript) {
    return { data: await Transcript.create(data as any), transcript: data };
  }

  @Post("/update/:id")
  async update(@Param("id") id: number, @Body() data: ITranscript) {
    if (!(await Transcript.find(id as any))) {
      throw new NotFoundError();
    }
    console.log(id);
    return {
      data: await Transcript.where("id", id).update(
        data as any,
      ),
    };
  }

  @Get("/:id")
  async getOne(@Param("id") id: string) {
    const transcript = await Transcript.find(id as any);
    if (!transcript) {
      throw new NotFoundError();
    }
    return { data: transcript };
  }
}
