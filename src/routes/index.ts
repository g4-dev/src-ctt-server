import { Router } from "https://deno.land/x/oak/mod.ts";
import { globToRegExp } from "https://deno.land/std/path/glob.ts";
import transcriptRoutes from "./transcriptRoutes.ts";
//import userRoutes from "./transcriptRoutes.ts";

// let files = globToRegExp("./*Routes", {
//   flags: "g",
//   extended: true,
//   globstar: true,
// });

// console.log(files);

let router: Router = new Router();

router = transcriptRoutes(router);
//router = userRoutes(router);

export default router;
