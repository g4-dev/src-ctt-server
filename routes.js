import { Router } from "https://deno.land/x/oak/mod.ts";

import getTranscripts from "./controllers/getTranscripts.js";
import getTranscriptDetails from "./controllers/getTranscriptDetails.js";
import createTranscript from "./controllers/createTranscript.js";
import updateTranscript from "./controllers/updateTranscript.js";
import deleteTranscript from "./controllers/deleteTranscript.js";

const router = new Router();

router
  .get("/transcripts", getTranscripts)
  .get("/transcripts/:id", getTranscriptDetails)
  .post("/transcripts", createTranscript)
  .put("/transcripts/:id", updateTranscript)
  .delete("/transcripts/:id", deleteTranscript);

export default router;
