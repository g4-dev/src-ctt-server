import { config } from 'dotenv';
// import Drash from 'drash';
import resources from './resources/index.ts';
import {HOST, PORT} from './utils/constants.ts';

const env = config();
const address = `${env[HOST]}:${env[PORT]}`;

/* @todo
    - need a way to use ServerConfigs interface here
    - need to load config in specific module then export
*/

export const app = {
    address,
    resources,
    response_output: 'application/json',
};
