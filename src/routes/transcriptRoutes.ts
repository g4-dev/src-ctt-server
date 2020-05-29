import { transcript } from "../model/index.ts";
import { crud } from "../controllers/transcriptController.ts";

crud.init(transcript);

export default (router: any) => {
  router
    //.get("/transcripts", crud.getAll)
    //.get("/transcripts/:id", crud.getDetails)
    .post("/transcripts", crud.add);
  //.put("/transcripts/:id", crud;update)
  //.delete("/transcripts/:id", crud.remove);

  return router;
};
