import client from "../config/database.ts";
import * as doesExist from "../modules/data/doesExist.ts";
import { UserInterface } from "../model/userInterface.ts";
import { update } from "../repo/user.ts";

export async function update({
  request,
  response,
  params,
}: {
  request: any;
  response: any;
  params: any;
}) {
  const body = await request.body();
  const userInfo: UserInterface = body.value;
  const hasRecord = await doesUserExist.isSatisfiedBy(params.id);
  let responseMessage = {};
  let status = 200;

  if (hasRecord) {
    responseMessage = await update(userInfo.name, userInfo.country, params.id);
  } else {
    responseMessage = { error: "User not found!" };
    status = 400;
  }

  response.body = responseMessage;
  response.status = status;
}
