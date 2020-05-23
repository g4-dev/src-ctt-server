import client from 'config/database.ts';
import { search } from '../repository/user.ts';

export async function getAll ({ response }: { response: any }) { 
  const result = await search();
  response.body = result.rows;
}