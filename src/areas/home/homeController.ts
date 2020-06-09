import {
  Controller,
  UseHook,
  Get,
} from "../../deps.ts";

import { TokenHook } from "../../hooks/auth.ts";
import { CatchHook } from "../../hooks/error.ts";

@UseHook(CatchHook)
@UseHook(TokenHook)
@Controller()
export class HomeController {
  @Get()
  welcome() {
    return { message: "Welcome to Call2Text Api" };
  }
}
