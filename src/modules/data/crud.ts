import { BaseModel, Where, HttpError } from "../../deps.ts";
import { conn } from "../../config.ts";
import { isHttpError, Status, STATUS_TEXT } from "../../deps.ts";
import { initDataModule, doesExist } from "./index.ts";
import {
  Put,
  All,
  Delete,
  Post,
  Get,
  CrudInterface,
} from "@/interfaces/index.ts";

let model: BaseModel;
// response pre filled field
let status: number = 200;
let error: ApiError = undefined;

export abstract class Crud implements CrudInterface {
  constructor(newModel: BaseModel) {
    model = newModel;
    initDataModule(newModel);
    conn();
  }

  public async getDetails({ params, response }: Get) {
    if (!doesExist(params.id)) {
      throw new HttpError(STATUS_TEXT.get(Status.NotFound));
    } else {
      response.body = await model.findById(params.id);
    }
  }

  public async add({ request, response }: Post) {
    const body = await request.body();
    const modelInstance: BaseModel = body.value;
    const id = await model.insert(modelInstance);

    if (!id) {
      error = "Invalid request!";
      response.status = 400;
    } else {
      response.body = `Ressource created : ${id}`;
      response.status = 200;
    }

    return response;
  }

  async remove({ params, response }: Delete) {
    const hasRecord = await doesExist(params.id);
    let status = 200;
    if (hasRecord) {
      response.body = {
        message: await model.delete(Where.field("id").eq(params.id)),
      };
    } else {
      response.body = { error: "Data not found!" };
      status = 400;
    }
    generateResponse(response, status);

    return response;
  }

  async getAll({ response }: All) {
    return (response.body = await model.findAll(Where.field("id").notNull()));
  }

  async update({ request, response, params }: Put) {
    const body = await request.body();
    const hasRecord = await doesExist(params.id);
    let status = 200;
    if (hasRecord) {
      response.body = await model.update({ id: params.id, ...body.value });
    } else {
      response.body = { error: "Transcript not found!" };
      status = 400;
    }

    return generateResponse(response, status);
  }
}

// Response builder module
type ApiError = string | Error | undefined;

type Response = {
  body: {};
  status: number;
  error: ApiError;
};

function generateResponse(
  response: Response,
  code: number,
  error?: ApiError,
): Response {
  response.status = code;
  error ? (response.error = error) : null;

  return response;
}
