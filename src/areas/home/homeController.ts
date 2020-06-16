import {
  Controller,
  UseHook,
  Get,
  Res,
} from "../../deps.ts";

import { TokenHook } from "../../hooks/auth.ts";
import { CatchHook } from "../../hooks/error.ts";
import { readJson } from "../../deps.ts";

@Controller()
export class HomeController {
  @UseHook(CatchHook)
  @UseHook(TokenHook)
  @Get()
  welcome() {
    return { message: "Welcome to Call2Text Api" };
  }

  @Get("/doc.json")
  async apiDoc() {
    return await readJson("./api.json");
  }
}
