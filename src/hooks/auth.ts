// Auth verify
import { Context, HookTarget, ForbiddenError } from "../deps.ts";
import { validateJwt } from "https://deno.land/x/djwt/validate.ts";
import { JwtConfig } from "../config/jwt.ts";

type PayloadType = string;

export class TokenHook implements HookTarget<unknown, PayloadType> {
  async onPreAction(context: Context<unknown>, payload: PayloadType) {
    return new Promise(async (resolve, reject) => {
      // Get the token from the request
      const token = context.request.headers
        .get(JwtConfig.header)
        ?.replace(`${JwtConfig.schema} `, "");

      // reject request if token was not provide
      if (!token) {
        throw new ForbiddenError("error");
      }

      // check the validity of the token
      if (
        !(await validateJwt(token, JwtConfig.secretKey, { isThrowing: false }))
      ) {
        throw new ForbiddenError("error");
      }
      resolve();
    });
  }
}
