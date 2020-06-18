import { Database } from "../deps.ts";
import { Transcript, User } from "../model/index.ts";
import {
  APP_DEBUG,
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_USER,
  DB_PORT,
  DB_TYPE,
} from "../env.ts";

// Test db is a prefilled mysqlite raft
const dbMapping: any = {
  "mysql": {
    host: DB_HOST,
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    port: Number(DB_PORT) || 3306,
  },
  "sqlite3": {
    filepath: "./tests/database.sqlite",
  },
};

const db = new Database(
  { dialect: DB_TYPE || "mysql" as any, debug: APP_DEBUG === "true" },
  dbMapping[DB_TYPE || "mysql"],
);

db.link([Transcript, User]);

export { db };
