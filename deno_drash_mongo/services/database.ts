import { init, MongoClient } from 'mongo';
import { config } from 'dotenv';
import { MONGO_DATABASE_NAME, MONGO_CONNECTION_STRING } from "../utils/constants.ts";

export default async (collection: string) => {
    // @todo load env variables to a specific module
    const env = config();

    await init();

    const client = new MongoClient();
    client.connectWithUri(env[MONGO_CONNECTION_STRING]);
    const db = client.database(env[MONGO_DATABASE_NAME]);

    return db.collection(collection);
}
