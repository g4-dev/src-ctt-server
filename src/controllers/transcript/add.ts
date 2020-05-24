import {
    BaseModel,
  } from "https://deno.land/x/dso@v1.0.0/mod.ts";

export class Crud {

    model: BaseModel;

    public async add ({ request, response }: { request: any; response: any }) {
        const body = await request.body();
        const modelInstance : BaseModel = body.value;
        let status = 200;

        const id = await this.model.insert(modelInstance)

        if (!id) {
            response.body = { "error": "Invalid request!" };
            status = 400;
        }

        response.status = status;
    }
}
