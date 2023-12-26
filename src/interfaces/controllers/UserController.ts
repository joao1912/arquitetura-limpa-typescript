import { HttpRequest } from "./Ports/HttpRequest";
import { HttpResponse } from "./Ports/HttpResponse";

export class UserController {

    async getUsers(req: HttpRequest, res: HttpResponse): Promise<any> {
        
        res.status(200).send('teste')

    }

}