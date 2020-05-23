import { getTranscripts } from "../services/transcriptService.js";

export default async ({ response }) => {
  response.body = await getTranscripts();
};