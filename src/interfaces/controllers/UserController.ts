import { GetAllUsers } from "../../application/useCases/user/GetAllUsers";
import { OrmUserRepository } from "../../database/repositories/OrmUserRepository";
import { HttpRequest } from "./Ports/HttpRequest";
import { HttpResponse } from "./Ports/HttpResponse";
import { IUser } from "../../domain/repositories/userRepository";
import { UserControllerRepository } from "./repositories/UserControllerRepository";
import { IUserCreated } from "../../application/useCases/user/CreateUser";
import { GetUsers } from "../../application/useCases/user/GetUser";

interface IBodyResponse {
    data: any
    message: string
}

const userService = new OrmUserRepository()

export class UserController implements UserControllerRepository {

    async getUser(req: HttpRequest, res: HttpResponse): Promise<void> {
        
        const userID = req.params.userID
        const getOneUser = new GetUsers(userService)
        
        try {
            
            const user = getOneUser.execute(userID)

            const bodyResponse: IBodyResponse = {
                data: user,
                message: 'success'
            }
            
            res.status(200).json(bodyResponse)

        } catch (error) {

            throw new Error('can not find user: ' + error)

        }

    }

    async getUsers(req: HttpRequest, res: HttpResponse): Promise<void> {
        
        const getUsers = new GetAllUsers(userService)

        try {

            const users =  getUsers.execute()

            const bodyResponse: IBodyResponse = {
                data: users,
                message: 'success'
            }

            res.status(200).json(bodyResponse)

        } catch (error) {
            
            throw new Error('can nor find users: ' + error)
        }

    }

    async createUser(req: HttpRequest, res: HttpResponse): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async updateUser(req: HttpRequest, res: HttpResponse): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async deleteUser(req: HttpRequest, res: HttpResponse): Promise<void> {
        throw new Error("Method not implemented.");
    }

    

}