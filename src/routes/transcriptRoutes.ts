import { transcript } from "../model/index.ts";
import { TranscriptController } from "../controllers/transcriptController.ts";

let c = new TranscriptController(transcript);

export default (router: any) => {
  router
    //.get("/transcripts", crud.getAll)
    .get("/transcripts/:id", c.getDetails)
    .post("/transcripts", c.add);
  //.put("/transcripts/:id", crud;update)
  //.delete("/transcripts/:id", crud.remove);

  return router;
};
