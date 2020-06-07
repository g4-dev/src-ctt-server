//
import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  Res,
  Delete,
  QueryParam,
  UseHook,
  bcrypt,
} from "../../deps.ts";
import { User, IUser } from "../../model/index.ts";
import { TokenHook } from "../../hooks/auth.ts";
import { ForbiddenError } from "../../deps.ts";

@Controller("/users")
export class AuthController {
  @Get("/list")
  list() {
    return User.all();
  }
  @Post("/create")
  async create(values: any) {
    if (
      !values.masterKey &&
      values.masterKey == User.where("isMasterKey", true).first()
    ) {
      throw ForbiddenError;
    }
    const token = await User.hashToken(values.token);

    const user: IUser = {
      name: values.name,
      token,
      isMasterKey: false,
    };
    await User.create(user as any);
    return values;
  }

  @Delete("/delete")
  async delete(id: string) {
    await User.deleteById(id);
  }

  @Get("/users/:id")
  getOne(id: string) {
    return User.where("id", id).first();
  }

  // @Post("/edit")
  // async update(id: string, values: IUser) {
  //   await User.where("id", id).update(values as any);
  //   return this.getOne(id);
  // }

  @Post("/login")
  async login(name: string, token: string) {
    const user = await User.where("name", name).first();
    if (!user || !(await bcrypt.compare(token, user.token))) {
      return false;
    }

    return User.generateJwt(user.id);
  }

  @Post("/master-key")
  async initMasterKey() {
    if (null !== User.where("isMasterKey", true).first()) {
      throw new ForbiddenError();
    }
    // TODO
  }
}
