//
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

@Controller("/account")
export class AuthController {
  @Get("/")
  getAll() {
    return "Your account";
  }
}
