import { App, CorsBuilder } from "./deps.ts";
import { IP, PORT, ORIGINS } from "./env.ts";
import { container } from "./config/container.ts";

const app = new App(container);

app.useCors(
  new CorsBuilder()
    .WithOrigins(ORIGINS)
    .AllowAnyMethod()
    .AllowAnyHeader(),
);

app.listen(`${IP}:${PORT || 80}`);
