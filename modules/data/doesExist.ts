import client from '../config/database';

export async function isSatisfiedBy(dataType:string, id:number) {
    const result = await client.query(`SELECT COUNT(*) count FROM ${dataType} WHERE id = ?`, [id]);
    return result[0].count >= 1;
}