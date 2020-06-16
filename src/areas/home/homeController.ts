import {
  Controller,
  UseHook,
  Req,
  Get,
} from "../../deps.ts";

import { TokenHook } from "../../hooks/auth.ts";
import { CatchHook } from "../../hooks/error.ts";

@Controller()
export class HomeController {
  @UseHook(CatchHook)
  @UseHook(TokenHook)
  @Get()
  welcome() {
    return { message: "Welcome to Call2Text Api" };
  }

  @Get("/doc.json")
  async apiDoc(@Req() request: Request) {
    request.headers.set("Access-Control-Allow-Origin", "*");
    return await readJson("./api.json");
  }
}

async function readJson(filePath: string) {
  const decoder = new TextDecoder("utf-8");

  const content = decoder.decode(await Deno.readFile(filePath));

  try {
    return JSON.parse(content);
  } catch (err) {
    err.message = `${filePath}: ${err.message}`;
    throw err;
  }
}
