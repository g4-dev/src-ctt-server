import { Area } from "../../deps.ts";
import { HomeController } from "./homeController.ts";

@Area({
  controllers: [HomeController],
})
export class HomeArea {}
