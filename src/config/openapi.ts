import { AlosaurOpenApiBuilder } from "https://deno.land/x/alosaur/openapi/mod.ts";
import { container } from "./container.ts";
import { IP, PORT } from "../env.ts";

AlosaurOpenApiBuilder
  .create(container)
  .addTitle("Call2Text Api")
  .addVersion("0.0.1")
  .addDescription(`Documentation de l'api de Call2Text`)
  .addServer({
    url: `${IP}:${PORT}`,
    description: "Call2Text Api Dev",
  })
  .addServer({
    url: "http://ctt-server.loicroux.com:81/",
    description: "Call2Text Api Production",
  })
  .saveToFile("./api.json");
