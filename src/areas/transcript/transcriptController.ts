import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  Res,
  QueryParam,
  UseHook,
} from "@/deps.ts";
import { Transcript } from "@/model/index.ts";
import { TokenHook } from "../../hooks/auth.ts";

@Controller("/transcripts")
export class TranscriptController {
  @Get("/")
  getAll() {
    return "List transcript";
  }

  @Post("/")
  async add(@Body(Transcript) data: Transcript) {
    return {
      data,
      errors: data, ///await validate(data),
    };
  }

  @UseHook(TokenHook)
  @Get("/transcript/:id")
  getOne(
    @Req() request: Request,
    @Res() response: Response,
    @QueryParam("id") id: string
  ) {
    return { text: id };
  }
}
