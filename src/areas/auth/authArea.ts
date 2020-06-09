import { Area } from "../../deps.ts";
import { AuthController } from "./authController.ts";

@Area({
  baseRoute: "/auth",
  controllers: [AuthController],
})
export class AuthArea {}
