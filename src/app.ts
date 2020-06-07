import { App } from "./deps.ts";
import { IP, APP_PORT } from "./env.ts";
import { container } from "./config/container.ts";
//import { plainToClassTransformer } from "./modules/transforms/plainToClass.ts";

const app = new App(container);

// Transforms
//app.useTransform(plainToClassTransformer);

app.listen(`${IP}:${APP_PORT || 80}`);
