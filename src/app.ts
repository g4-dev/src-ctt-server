import { App, CorsBuilder } from "./deps.ts";
import { IP, APP_PORT } from "./env.ts";
import { container } from "./config/container.ts";

const app = new App(container);
app.useCors(
  new CorsBuilder()
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader(),
);

app.listen(`${IP}:${APP_PORT || 80}`);
