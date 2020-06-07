import { config } from "https://deno.land/x/dotenv/mod.ts";

const APP_ENV = Deno.env.get("APP_ENV") || "dev";

export const {
  // App
  APP_HOST,
  APP_PORT,
  // Db
  DB_USER,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_NAME,
  // Api auth
  JWT_KEY,
  JWT_TTL,
} = config({ path: `.env.${APP_ENV}` });
