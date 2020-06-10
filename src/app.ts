import { App } from "./deps.ts";
import { IP, PORT } from "./env.ts";
import { container } from "./config/container.ts";

const app = new App(container);

await app.listen(`${IP}:${PORT || 80}`);
