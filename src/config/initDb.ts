import { Database } from "../deps.ts";
import { Transcript, User } from "../model/index.ts";
import {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_USER,
  DB_PORT,
  DB_TYPE,
} from "../env.ts";
console.warn(DB_TYPE);
// Test db is a prefilled mysqlite raft
export const dbMapping: any = {
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
  DB_TYPE || "mysql" as any,
  dbMapping[DB_TYPE || "mysql"],
);

db.link([Transcript, User]);

export { db };
