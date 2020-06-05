import { config } from "https://deno.land/x/dotenv/mod.ts";

export const {
  // App
  APP_HOST,
  APP_PORT,
  APP_ENV,
  // Db
  DB_USER,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_NAME,
  // Api auth
  JWT_KEY,
} = config();

//export { APP_HOST, APP_PORT, JWT_KEY };
