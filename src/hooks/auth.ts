// Auth verify
import { Context, HookTarget, ForbiddenError } from "../deps.ts";
import { validateJwt } from "https://deno.land/x/djwt/validate.ts";
import { JwtConfig } from "../config/jwt.ts";

type PayloadType = string;

export class TokenHook implements HookTarget<unknown, PayloadType> {
  async onPreAction(context: Context<unknown>, payload: PayloadType) {
    return new Promise(async (resolve, reject) => {
      // Get the token from the request
      const token: any = context.request.headers
        .get(JwtConfig.header)
        ?.replace(`${JwtConfig.schema} `, "");

      const jwt: any = await validateJwt(token, JwtConfig.secretKey);
      if (!token || !jwt.isValid) {
        reject(new ForbiddenError("Token error " + jwt.error.message || ""));
      }
      resolve();
    });
  }
}
