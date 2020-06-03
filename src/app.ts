import { Application } from "./deps.ts";
import { APP_HOST, APP_PORT } from "./config.ts";
import { router } from "./routes/index.ts";
import { handler, _404, _500 } from "./middlewares/errors/index.ts";

const app = new Application();

app.use(handler);
app.use(router.routes());
app.use(router.allowedMethods());
// app.use(_404);
app.use(_500);

console.log(`Listening on port: ${APP_PORT}...`);

await app.listen(`${APP_HOST}:${APP_PORT}`);
