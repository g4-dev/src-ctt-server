import { getTranscript } from "../services/transcriptService";

export default async ({
  params,
  response
}) => {
  const transcriptId = params.id;

  if (!transcriptId) {
    response.status = 400;
    response.body = { msg: "Invalid transcript id" };
    return;
  }

  const foundTranscript = await getTranscript(transcriptId);
  if (!foundTranscript) {
    response.status = 404;
    response.body = { msg: `transcript with ID ${transcriptId} not found` };
    return;
  }

  response.body = foundTranscript;
};