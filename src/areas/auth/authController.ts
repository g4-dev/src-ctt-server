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
  @Get("/create-user")
  async create(
    @Req() request: Request,
    @QueryParam("name") name: string,
  ) {
    const mKey = await this.masterKey();
    if (!mKey as boolean && name == "master") {
      return this.initMasterKey();
    }

    const reqHeadersMasterKey = request.headers.get("master_key");
    if (
      !reqHeadersMasterKey &&
      reqHeadersMasterKey !== mKey.token
    ) {
      throw new ForbiddenError();
    }

    return this.createUser({
      name: name,
      token: "",
      isMasterKey: false,
    });
  }

  @Get("/users")
  async list() {
    return await User
      .where("isMasterKey", false)
      .select(...SECURE_USER_FIELDS).all();
  }

  @Get("/users/:id")
  getOne(@Param("id") id: number) {
    return User.select(...SECURE_USER_FIELDS).find(id);
  }

  @Delete("/users/:id")
  delete(@Param("id") id: number) {
    return User
      .where("isMasterKey", false)
      .deleteById(id);
  }

  @Post("/login")
  async login(@Body() values: IUser) {
    const user = await User.where("name", values.name).first();
    if (!user || !(await bcrypt.compare(values.token, user.token))) {
      throw new BadRequestError("Invalid credentials");
    }

    return { data: User.generateJwt(user.id) };
  }

  @Get("/setup")
  async setup() {
    if (!this.masterKey()) {
      throw new ForbiddenError("Setup already done");
    }

    return true;
  }

  private async canManageUser(id: number) {
    const toDelete = await User.find(id);
    const mKey = await this.masterKey() as any;
    console.log(toDelete);
    console.log(mKey);

    return mKey.id != toDelete.id;
  }

  // TODO : if time allow it, secure key with bcrypt
  protected async initMasterKey() {
    const master: IUser = {
      name: "master",
      isMasterKey: true,
      token: "",
    };
    return { data: this.createUser(master) };
  }

  protected async createUser({ name, isMasterKey = false }: IUser) {
    const userKeyToken = v4.generate();
    const user: IUser = {
      name: name,
      token: await User.hashToken(userKeyToken),
      isMasterKey: isMasterKey,
    };
    console.log(userKeyToken, user);
    return {
      data: User.create(user as any),
      user: { ...user, ...{ token: userKeyToken } },
    };
  }
}
