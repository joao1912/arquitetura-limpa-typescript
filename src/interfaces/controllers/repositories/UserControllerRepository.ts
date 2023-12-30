import { HttpRequest } from "../Ports/HttpRequest";
import { HttpResponse } from "../Ports/HttpResponse";

export interface UserControllerRepository {

    getUser(req: HttpRequest, res: HttpResponse): Promise<void>

    getUsers(req: HttpRequest, res: HttpResponse): Promise<void>

    createUser(req: HttpRequest, res: HttpResponse): Promise<void>

    updateUser(req: HttpRequest, res: HttpResponse): Promise<void>

    deleteUser(req: HttpRequest, res: HttpResponse): Promise<void>

}