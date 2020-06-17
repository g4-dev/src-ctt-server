import { JWT_KEY, JWT_TTL } from "../env.ts";

export const JwtConfig = {
  header: "Authorization",
  schema: "Bearer",
  secretKey: JWT_KEY || "",
  expirationTime: new Date(Date.now() + htm(Number(JWT_TTL))).getTime(), // Use hour validity
  type: "JWT",
  alg: "HS256",
};

/**
 * Give an hour and get a milisecond equivalent
 * 
 * @param h Hour
 * @param m Minutes
 * @param s Seconds
 */
function htm(h: number = 1, m: number = 0, s: number = 0) {
  return ((h * 60 * 60 + m * 60 + s) * 1000);
}
