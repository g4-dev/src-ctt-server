import { Router } from "https://deno.land/x/oak/mod.ts";

import {
  getTranscripts, 
  getTranscriptDetails, 
  createTranscript,
  updateTranscript,
  deleteTranscript
 } from './controllers/transcript'

const router = new Router();

router
  .get("/transcripts", getTranscripts)
  .get("/transcripts/:id", getTranscriptDetails)
  .post("/transcripts", createTranscript)
  .put("/transcripts/:id", updateTranscript)
  .delete("/transcripts/:id", deleteTranscript);

export default router;
