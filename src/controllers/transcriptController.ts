import { BaseModel, Where } from "../deps.ts";
import { conn } from "../config.ts";
import { Put, All, Delete, Post, Get } from "../interfaces/index.ts";
import { TranscriptModel } from "../model/TranscriptModel.ts";
import { Crud } from "../modules/data/crud.ts";

let model: TranscriptModel;

export class TranscriptController extends Crud {
  constructor(newModel: TranscriptModel) {
    super(newModel);
    model = newModel;
  }

  async getDetails({ params, response }: Get): Promise<any> {
    return (response = super.getDetails({
      params: params,
      response: response,
    }));
  }

  async add({ request, response }: Post): Promise<any> {
    response = super.add({ request: request, response: response });
  }

  async remove({ params, response }: Delete): Promise<any> {
    response = super.remove({
      params: params,
      response: response,
    });
  }

  async getAll({ response }: All): Promise<any> {
    response = super.getAll({
      response: response,
    });
  }

  async update({ request, response, params }: Put): Promise<any> {
    response = super.update({
      request: request,
      response: response,
      params: params,
    });
  }
}
