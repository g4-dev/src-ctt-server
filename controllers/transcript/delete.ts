import { createTranscript } from "../services/transcriptService.js";

export default async ({ request, response }) => {
  if (!request.hasBody) {
    response.status = 400;
    response.body = { msg: "Invalid Transcript data" };
    return;
  }

  const {
    value: { name, brand, is_live }
  } = await request.body();

  if (!name || !brand) {
    response.status = 422;
    response.body = { msg: "Incorrect Transcript data. Name and brand are required" };
    return;
  }

  const transcriptId = await createTranscript({ name, brand, is_live });

  response.body = { msg: "transcript created", transcriptId };
};