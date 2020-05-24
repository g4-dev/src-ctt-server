import Drash from 'drash';
import connect from "../services/database.ts";

export default class UserResource extends Drash.Http.Resource {
    static paths = ['/users', '/users/:id'];

    public async GET() {
        const users = await connect('users');
        const test = await users.insertOne({
            name: 'toto'
        });
        this.response.body = `Welcome to Drash PoC - version ${test}`;
        return this.response;
    }
}
