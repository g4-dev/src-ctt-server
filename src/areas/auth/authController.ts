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
import { CatchHook, TokenHook } from "../../hooks/index.ts";
import { ForbiddenError } from "../../deps.ts";
import { v4 } from "../../deps.ts";
import { JwtConfig } from "../../config/jwt.ts";

const SECURE_USER_FIELDS = ["id", "name", "created_at", "updated_at"];

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
   */
  @Get("/users/create")
  async create(
    @Req() request: Request,
    @QueryParam("name") name: string,
  ) {
    const masterKey = await this.masterKey();
    const token = request.headers.get("chosen_token") || "";
    if (!masterKey as boolean && name == "master") {
      return this.createUser({
        name: "master",
        master: true,
        token: token,
      });
    }

    this.canManage(request.headers, masterKey);

    return this.createUser({
      name: name,
      token: token,
      master: false,
    });
  }

  @UseHook(TokenHook)
  @Get("/users")
  async list() {
    return await User
      .where("master", false)
      .select(...SECURE_USER_FIELDS).all();
  }

  @UseHook(TokenHook)
  @Get("/users/:id")
  async getOne(
    @Param("id") id: string,
  ) {
    let qb: any = User.select(...SECURE_USER_FIELDS);
    const user = isNaN(Number(id))
      ? await qb.where("name", id).first()
      : await qb.find(id);

    return user;
  }

  @UseHook(TokenHook)
  @Delete("/users/:id")
  async delete(@Req() request: Request, @Param("id") id: number) {
    this.canManage(request.headers);

    return {
      ...await User
        .where("master", false)
        .deleteById(id),
      data: "deleted: " + id,
    };
  }

  @Post("/login")
  async login(@Body() values: IUser) {
    const user = await User.where("name", values.name).first();
    if (!user || !(await bcrypt.compare(values.token, user.token))) {
      throw new BadRequestError("Invalid credentials");
    }
    const token = User.generateJwt(user.id);

    return {
      token: token,
      expiration: new Date(JwtConfig.expirationTime).toString(),
    };
  }

  @Get("/setup")
  async setup() {
    if (!(await this.masterKey())) {
      throw new ForbiddenError("Setup already done");
    }

    return true;
  }

  // Verify if master key object exist
  protected async masterKey(): Promise<IUser> {
    return await User.select("token")
      .where("master", true)
      .first();
  }

  protected async canManage(
    headers: Headers,
    masterKeyPayload: IUser | undefined = undefined,
  ) {
    const reqHeadersMasterKey = headers.get("master_key");
    let masterKey: IUser = masterKeyPayload ?? await this.masterKey();
    if (
      !reqHeadersMasterKey &&
      !(await bcrypt.compare(
        reqHeadersMasterKey as string,
        masterKey.token,
      ))
    ) {
      throw new ForbiddenError("Can't manage users");
    }
  }

  protected async createUser({ name, token = "", master = false }: IUser) {
    const userKeyToken = token !== "" ? token : v4.generate();
    const user: IUser = {
      name: name,
      token: await User.hashToken(userKeyToken),
      master: master,
    };

    if (await User.where("name", name).first()) {
      throw new ForbiddenError("name already exist");
    }
    return {
      data: await User.create(user as any),
      user: { ...user, ...{ token: userKeyToken } },
    };
  }
}
