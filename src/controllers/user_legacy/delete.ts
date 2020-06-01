import { conn } from "../config/db.ts";
import { doesExist } from "../modules/data/doesExist.ts";
import { remove } from "../repo/user.ts";

export async function remove({
  params,
  response,
}: {
  params: any;
  response: any;
}) {
  const hasRecord = await doesExist.isSatisfiedBy("user", params.id);
  let responseMessage: {} | void = {};
  let status = 200;

  if (hasRecord) {
    responseMessage = await remove(params.id);
  } else {
    responseMessage = { error: "User not found!" };
    status = 400;
  }

  response.body = responseMessage;
  response.status = status;
}
