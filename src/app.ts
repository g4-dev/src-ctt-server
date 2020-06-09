import { App, CorsBuilder } from "./deps.ts";
import { IP, PORT } from "./env.ts";
import { container } from "./config/container.ts";

const app = new App(container);
app.useCors(
  new CorsBuilder()
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader(),
);

await app.listen(`${IP}:${PORT || 80}`);
