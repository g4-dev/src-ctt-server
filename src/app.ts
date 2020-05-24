import { Application } from "https://deno.land/x/oak/mod.ts";
import { APP_HOST, APP_PORT } from "./config/index.ts";
import router from "./routes/index.ts";
import _404 from "./controllers/404.ts";
import errorHandler from "./controllers/errorHandler.ts";
import {
  viewEngine,
  engineFactory,
  adapterFactory,
} from "https://deno.land/x/view_engine/mod.ts";

const denjuckEngine = await engineFactory.getDenjuckEngine();
const oakAdapter = await adapterFactory.getOakAdapter();
const app = new Application();

app.use(viewEngine(oakAdapter, denjuckEngine));
app.use(errorHandler);
app.use(router.routes());
app.use(router.allowedMethods());
app.use(_404);

console.log(`Listening on port: ${APP_PORT}...`);

await app.listen(`${APP_HOST}:${APP_PORT}`);
