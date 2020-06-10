import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseHook,
  BadRequestError,
} from "../../deps.ts";
import { Transcript, ITranscript } from "../../model/index.ts";

//import { TokenHook } from "../../hooks/auth.ts";
//import { CatchHook } from "../../hooks/error.ts";

//@UseHook(TokenHook)
@Controller()
export class TranscriptController {
  @Get()
  async getAll() {
    return { data: await Transcript.all() };
  }

  @Post()
  async add(@Body() data: ITranscript) {
    return { data: await Transcript.create(data as any) };
  }

  @Post("/update/:id")
  async update(@Param("id") id: number, @Body() data: ITranscript) {
    return {
      data: await Transcript.where("id", id).update(
        data as any,
      ),
    };
  }

  @Get("/:id")
  getOne(@Param("id") id: string) {
    return { data: Transcript.find(id as any) };
  }
}
