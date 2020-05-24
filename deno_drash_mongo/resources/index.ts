import Drash from 'drash';
import UserResource from "./user.ts";

class RootResource extends Drash.Http.Resource {
    static paths = ['/'];

    public GET() {
        this.response.body = `Welcome to Drash PoC - version ${1}`;
        return this.response;
    }
}

export default [
    RootResource,
    UserResource,
]
