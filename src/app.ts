import { App } from "./deps.ts";
import { APP_HOST, APP_PORT } from "./env.ts";
import { container } from "./config/container.ts";
//import { plainToClassTransformer } from "./modules/transforms/plainToClass.ts";

const app = new App(container);

// Transforms
//app.useTransform(plainToClassTransformer);

await app.listen(`${APP_HOST}:${APP_PORT}`);
