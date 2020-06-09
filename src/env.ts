import "https://deno.land/x/dotenv/load.ts";

export const {
  // App
  IP,
  PORT,
  // Db
  DB_USER,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_NAME,
  DB_TYPE,
  // Api auth
  JWT_KEY,
  JWT_TTL,
} = Deno.env.toObject();
