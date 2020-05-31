import { Router } from "https://deno.land/x/oak/mod.ts";
import transcriptRoutes from "./transcriptRoutes.ts";
//import userRoutes from "./transcriptRoutes.ts";

let router: Router = new Router();

router = transcriptRoutes(router);
//router = userRoutes(router);

export { router };
