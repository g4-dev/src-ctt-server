import { transcript } from "../model/index.ts";
import { TranscriptController } from "../controllers/transcriptController.ts";

export default (router: any) => {
  let c = new TranscriptController(transcript);

  router
    //.get("/transcripts", crud.getAll)
    .get("/transcripts/:id", c.getDetails)
    .post("/transcripts", c.add);
  //.put("/transcripts/:id", crud;update)
  //.delete("/transcripts/:id", crud.remove);

  return router;
};
