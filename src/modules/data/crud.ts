import { BaseModel, Where } from "../../deps.ts";
import { conn } from "../../config.ts";
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

export abstract class Crud implements CrudInterface {
  constructor(newModel: BaseModel) {
    model = newModel;
    initDataModule(newModel);
  }

  public async getDetails({ params, response }: Get) {
    let status: number | null = null;
    try {
      if (!(await doesExist(params.id))) {
        status = 404;
        throw new Error(`No data for ${model.modelName}`);
      } else {
        response.body = await model.findById(params.id);
        status = 200;
      }
    } catch (e) {
      response.body = { error: e };
      status = status ?? 500;
    } finally {
      response.status = status;

      return response;
    }
  }

  public async add({ request, response }: Post) {
    console.log(model);
    const body = await request.body();
    const modelInstance: BaseModel = body.value;

    conn();
    const id = await model.insert(modelInstance);

    if (!id) {
      response.body = { error: "Invalid request!" };
      response.status = 400;
    } else {
      response.body = `Ressource created : ${id}`;
      response.status = 200;
    }

    return response;
  }

  async remove({ params, response }: Delete) {
    conn();
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
    generateResponse(status, response);

    return response;
  }

  async getAll({ response }: All) {
    conn();
    return (response.body = await model.findAll(Where.field("id").notNull()));
  }

  async update({ request, response, params }: Put) {
    const body = await request.body();
    const hasRecord = await doesExist(params.id);
    let status = 200;
    if (hasRecord) {
      conn();
      await model.update({ id: params.id, ...body.value });
      response.body = { message: "Ressource updated" };
    } else {
      response.body = { error: "Transcript not found!" };
      status = 400;
    }

    return generateResponse(status, response);
  }
}

function generateResponse(
  code: number,
  response: {
    body: {};
    status: number;
  },
): {} {
  response.status = code;

  return response;
}
