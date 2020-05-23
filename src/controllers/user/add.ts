import client from 'config/database.js';
import { insert } from 'repo/user.ts';
import { UserInterface } from 'model/userInterface.ts';
  
export async function add ({ request, response }: { request: any; response: any }) {
    const body = await request.body();
    const userInfo: UserInterface = body.value;
    let status = 200;

    if (userInfo.hasOwnProperty('name') && userInfo.hasOwnProperty('country')) {
      response.body = await insert(userInfo);
    } else {
      response.body = { "error": "Invalid request!" };
      status = 400;
    }
    
    response.status = status;
}