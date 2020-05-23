import client from '../db/MySqlClient.ts';
import * as doesUserExist from '../data/doesExist.ts';
import { search } from '../repository/user.ts';

export async function getDetails ({ params, response }: { params: any; response: any }) {
    const hasRecord = await doesUserExist.isSatisfiedBy(params.id);
    let status = 200;
    
    if (hasRecord) {
      const result = await search(params);
      response.body = result.rows;
    } else {
      response.body = { "error": "User not found!" };
      status = 400;
    }
    
    response.status = status;
};