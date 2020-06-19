import { CorsBuilder } from "../deps.ts";
import { ORIGINS } from "../env.ts";

export const Cors = new CorsBuilder()
  .WithOrigins(ORIGINS)
  .WithMethods("POST, GET, OPTIONS, PUT, DELETE, OPTIONS")
  .WithHeaders(
    "X-Requested-With, Accept, Content-Type, Content-Length, api_key, master_key, chosen_token, Accept-Encoding, X-CSRF-Token, Authorization",
  )
  .AllowCredentials();
