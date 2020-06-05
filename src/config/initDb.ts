import { Database } from "../deps.ts";
import { Transcript } from "../model/index.ts";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER, DB_PORT } from "@/env.ts";

const db = new Database("mysql", {
  host: DB_HOST,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  port: Number(DB_PORT),
});

db.link([Transcript]);

export { db };
