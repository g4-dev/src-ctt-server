import { config } from "https://deno.land/x/dotenv/mod.ts";

const env = config();
const { APP_HOST, APP_PORT } = env;

// Database env
const DB = {
  hostname: env.DB_HOST || "127.0.0.1",
  username: env.DB_USER,
  password: env.DB_PASSWORD || "",
  port: Number(env.DB_PORT) || 3306,
  db: env.DB_NAME,
};

export { DB, APP_HOST, APP_PORT };
