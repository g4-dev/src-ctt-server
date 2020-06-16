import {
  Controller,
  UseHook,
  Get,
} from "../../deps.ts";

import { TokenHook } from "../../hooks/auth.ts";
import { CatchHook } from "../../hooks/error.ts";
import { readJson } from "../../deps.ts";

@UseHook(CatchHook)
@UseHook(TokenHook)
@Controller()
export class HomeController {
  @Get()
  welcome() {
    return { message: "Welcome to Call2Text Api" };
  }

  @Get("/doc")
  async apiDoc() {
    return await readJson("./api.json");
  }
}
