import { config } from "https://deno.land/x/dotenv/mod.ts";
import { dso } from "./deps.ts";

const {
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

// Database connection
dso.showQueryLog = APP_ENV === "dev";
export const conn = (): any => {
  dso.connect({
    hostname: DB_HOST || "127.0.0.1",
    username: DB_USER,
    password: DB_PASSWORD || "",
    port: Number(DB_PORT) || 3306,
    db: DB_NAME,
  });
};

export { dso, APP_HOST, APP_PORT, JWT_KEY };
