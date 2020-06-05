// Auth verify
import { Context, HookTarget, ForbiddenError } from "../deps.ts";
import { validateJwt } from "https://deno.land/x/djwt/validate.ts";
import { JWT_KEY } from "../env.ts";

/**
 * Create a default configuration
 */
export const JwtConfig = {
  header: "Authorization",
  schema: "Bearer",
  secretKey: JWT_KEY || "",
  expirationTime: 60000,
  type: "JWT",
  alg: "HS256",
};

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
