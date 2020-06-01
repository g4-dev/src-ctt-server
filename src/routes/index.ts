import { Router } from "../deps.ts";
import transcriptRoutes from "./transcriptRoutes.ts";
import authRoutes from "./authRoutes.ts";

let router: Router = new Router();

router = transcriptRoutes(router);
router = authRoutes(router);

export { router };
