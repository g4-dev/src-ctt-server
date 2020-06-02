import { Get, All, Delete, Put, Post } from "./index.ts";

export interface CrudInterface {
  getDetails({ params, response }: Get): Promise<any>;

  add({ request, response }: Post): Promise<any>;

  remove({ params, response }: Delete): Promise<any>;

  getAll({ response }: All): Promise<any>;

  update({ request, response, params }: Put): Promise<any>;
}
