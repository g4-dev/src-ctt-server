import { Area } from "../../deps.ts";
import { HomeController } from "./homeController.ts";

@Area({
  baseRoute: "/",
  controllers: [HomeController],
})
export class HomeArea {}
