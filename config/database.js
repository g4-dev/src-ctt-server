import { Client } from "https://deno.land/x/mysql/mod.ts";
import { DB_CONNECTION } from './config.js'

const client = await new Client().connect(DB_CONNECTION);

export default client
