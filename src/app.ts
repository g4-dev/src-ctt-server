import { App } from "./deps.ts";
import { IP, PORT } from "./env.ts";
import { container } from "./config/container.ts";
import { Cors } from "./middlewares/index.ts";

const app = new App(container);

app.useCors(Cors);

app.useStatic({
  root: `${Deno.cwd()}/uploads`,
  index: "public.html",
  baseRoute: "/uploads/",
});

app.listen(`${IP}:${PORT || 80}`);
