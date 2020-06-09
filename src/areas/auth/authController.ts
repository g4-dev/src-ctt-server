//
import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Req,
  Delete,
  QueryParam,
  UseHook,
  bcrypt,
} from "../../deps.ts";
import { User, IUser } from "../../model/index.ts";
import { CatchHook } from "../../hooks/error.ts";
import { ForbiddenError } from "../../deps.ts";
import { v4 } from "https://deno.land/std/uuid/mod.ts";

@UseHook(CatchHook)
@Controller()
export class AuthController {
  /**
   * Create an User from master key or create Master key (UUID)
   *
   * @param request {
   *    headers: { masterKey: string }
   * }
   * @param name User name (need name master to create masterKey)
   *
   * @returns {IUser}
   */
  @Get("/create")
  async create(
    @Req() request: Request,
    @QueryParam("name") name: string,
  ) {
    const masterKey = await User.select("token")
      .where("isMasterKey", true)
      .first();
    if (!masterKey && name == "master") {
      return this.initMasterKey();
    }

    const reqHeadersMasterKey = request.headers.get("master_key");
    if (
      !reqHeadersMasterKey &&
      reqHeadersMasterKey !== masterKey.token
    ) {
      throw new ForbiddenError();
    }

    const userKeyToken = v4.generate();
    const token = await User.hashToken(userKeyToken);
    const user: IUser = {
      name: name,
      token,
      isMasterKey: false,
    };

    return {
      data: await User.create(user as any),
      user: { ...user, ...{ token: userKeyToken } },
    };
  }

  @Delete("/delete/:id")
  async delete(@Param("id") id: number) {
    await User.deleteById(id);
  }

  @Get("/users")
  list() {
    return User.all();
  }

  @Get("/users/:id")
  getOne(@Param("id") id: number) {
    return User.find(id);
  }

  @Post("/login")
  async login(@Body() values: IUser) {
    const user = await User.where("name", values.name).first();
    if (!user || !(await bcrypt.compare(values.token, user.token))) {
      return false;
    }

    return { data: User.generateJwt(user.id) };
  }

  // TODO : if time allow it, secure key with bcrypt
  protected async initMasterKey() {
    const master: IUser = {
      name: "master",
      isMasterKey: true,
      token: v4.generate(),
    };
    return { data: User.create(master as any), user: master };
  }
}
