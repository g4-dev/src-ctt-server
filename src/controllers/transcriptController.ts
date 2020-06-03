import { TranscriptModel } from "../model/TranscriptModel.ts";
import { Crud } from "../modules/data/crud.ts";

let model: TranscriptModel;

// TODO don't use OOP
export class TranscriptController extends Crud {
  constructor(newModel: TranscriptModel) {
    super(newModel);
    model = newModel;
  }

  // Example overrrides
  // async add({ request, response }: Post): Promise<any> {
  //   response = super.add({ request: request, response: response });
  // }

  // async remove({ params, response }: Delete): Promise<any> {
  //   response = super.remove({
  //     params: params,
  //     response: response,
  //   });
  // }
}
