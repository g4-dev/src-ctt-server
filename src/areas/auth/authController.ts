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
  BadRequestError,
} from "../../deps.ts";
import { User, IUser } from "../../model/index.ts";
import { CatchHook } from "../../hooks/error.ts";
import { ForbiddenError } from "../../deps.ts";
import { v4 } from "https://deno.land/std/uuid/mod.ts";

const SECURE_USER_FIELDS = ["name", "id", "created_at", "updated_at"];

@UseHook(CatchHook)
@Controller()
export class AuthController {
  // Verify if master key object exist
  protected async masterKey(): Promise<IUser> {
    return await User.select("token")
      .where("isMasterKey", true)
      .first();
  }
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
  @Get("/users/create")
  async create(
    @Req() request: Request,
    @QueryParam("name") name: string,
  ) {
    const masterKey = await this.masterKey();
    if (!masterKey as boolean && name == "master") {
      return this.createUser({
        name: "master",
        isMasterKey: true,
        token: "",
      });
    }

    this.canManage(request.headers, masterKey);

    return this.createUser({
      name: name,
      token: "",
      isMasterKey: false,
    });
  }

  @Get("/users")
  async list() {
    return {
      data: await User
        .where("isMasterKey", false)
        .select(...SECURE_USER_FIELDS).all(),
    };
  }

  @Get("/users/:id")
  getOne(@Param("id") id: number) {
    return User.select(...SECURE_USER_FIELDS).find(id);
  }

  @Delete("/users/:id")
  async delete(@Req() request: Request, @Param("id") id: number) {
    this.canManage(request.headers);
    await User
      .where("isMasterKey", false)
      .deleteById(id);

    return {
      data: "deleted: " + id,
    };
  }

  @Post("/login")
  async login(@Body() values: IUser) {
    const user = await User.where("name", values.name).first();
    if (!user || !(await bcrypt.compare(values.token, user.token))) {
      throw new BadRequestError("Invalid credentials");
    }

    return { token: User.generateJwt(user.id) };
  }

  @Get("/setup")
  async setup() {
    if (!this.masterKey()) {
      throw new ForbiddenError("Setup already done");
    }

    return true;
  }

  protected canManage(
    headers: Headers,
    masterKeyPayload: IUser | undefined = undefined,
  ) {
    const reqHeadersMasterKey = headers.get("master_key");
    let masterKey: any = masterKeyPayload ?? this.masterKey();
    if (
      !reqHeadersMasterKey &&
      reqHeadersMasterKey !== masterKey.token
    ) {
      throw new ForbiddenError();
    }
  }

  protected async createUser({ name, isMasterKey = false }: IUser) {
    const userKeyToken = v4.generate();
    const user: IUser = {
      name: name,
      token: await User.hashToken(userKeyToken),
      isMasterKey: isMasterKey,
    };

    if (await User.where("name", name).first()) {
      throw new ForbiddenError("name already exist");
    }
    return {
      data: await User.create(user as any),
      token: { ...user, ...{ token: userKeyToken } },
    };
  }
}
