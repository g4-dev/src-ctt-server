import { Router } from "https://deno.land/x/oak/mod.ts";

import {
  getAll, 
  getDetails, 
  add,
  update,
  remove
 } from './controllers/transcript.ts'

const router = new Router();

router
  .get("/transcripts", getAll)
  .get("/transcripts/:id", getDetails)
  .post("/transcripts", add)
  .put("/transcripts/:id", update)
  .delete("/transcripts/:id", remove);

export default router;
