import { Area } from "@/deps.ts";
import { AuthController } from "./authController.ts";

@Area({
  controllers: [AuthController],
})
export class AuthArea {}
