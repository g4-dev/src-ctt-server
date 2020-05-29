import { BaseModel, Where } from "https://deno.land/x/dso@v1.0.0/mod.ts";
import { conn } from "../db.ts";
import { isSatisfiedBy } from "../modules/data/doesExist.ts";

let model: BaseModel;

export const crud = {
  init(newModel: BaseModel) {
    model = newModel;
  },

  async getDetails({ params, response }: { params: any; response: any }) {
    const hasRecord = await isSatisfiedBy(model, params.id);
    let status = 200;

    if (hasRecord) {
      response.body = await model.findById(params.id);
    } else {
      response.body = { error: "User not found!" };
      status = 400;
    }

    response.status = status;
  },

  async add({ request, response }: { request: any; response: any }) {
    console.log(model);
    const body = await request.body();
    const modelInstance: BaseModel = body.value;
    let status = 200;

    conn();
    const id = await model.insert(modelInstance);

    if (!id) {
      response.body = { error: "Invalid request!" };
      status = 400;
    }

    response.body = `Ressource created : ${id}`;
    response.status = status;
  },

  async remove({ params, response }: { params: any; response: any }) {
    conn();
    const hasRecord = await isSatisfiedBy(model, params.id);
    let responseMessage: {} | void = {};
    let status = 200;

    if (hasRecord) {
      responseMessage = await model.delete(Where.field("id").eq(params.id));
    } else {
      responseMessage = { error: "Data not found!" };
      status = 400;
    }

    response.body = responseMessage;
    response.status = status;
  },

  async getAll({ response }: { response: any }) {
    response.body = await model.findAll(Where.field("id").notNull());
  },

  async update({
    request,
    response,
    params,
  }: {
    request: any;
    response: any;
    params: any;
  }) {
    const body = await request.body();
    const hasRecord = await isSatisfiedBy(model, params.id);
    let responseMessage = {};
    let status = 200;

    if (hasRecord) {
      await model.update({ id: params.id, ...body.value });
    } else {
      responseMessage = { error: "User not found!" };
      status = 400;
    }

    responseMessage = "Ressource updated";

    response.body = responseMessage;
    response.status = status;
  },
};
