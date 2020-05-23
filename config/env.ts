import { config } from "https://deno.land/x/dotenv/load.ts";

console.log('env', config({ safe: true }))
const env = Deno.env()

export const APP_HOST = env.APP_HOST || "127.0.0.1"
export const APP_PORT = env.APP_PORT || 8080

// Database env
export const DB_CONNECTION = {
    password: env.DB_PASSWORD || '',
    hostname: env.DB_HOST || "127.0.0.1",
    username: env.DB_USER || 'root',
    port: env.DB_PORT || 3306,
    db: env.DB_NAME
}
