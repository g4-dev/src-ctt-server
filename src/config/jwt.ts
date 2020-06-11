import { JWT_KEY, JWT_TTL } from "../env.ts";

console.log(JWT_TTL);

export const JwtConfig = {
  header: "Authorization",
  schema: "Bearer",
  secretKey: JWT_KEY || "",
  expirationTime: Number(JWT_TTL),
  type: "JWT",
  alg: "HS256",
};
