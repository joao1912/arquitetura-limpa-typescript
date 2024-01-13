import { GetAllUsers } from "../../application/useCases/user/GetAllUsers.ts";
import { OrmUserRepository } from "../../database/repositories/OrmUserRepository.ts";
import { HttpRequest } from "./Ports/HttpRequest.ts";
import { HttpResponse } from "./Ports/HttpResponse.ts";
import { IUser } from "../../domain/repositories/userRepository.ts";
import { UserControllerRepository } from "./repositories/UserControllerRepository.ts";
import { CreateUser, IUserCreated } from "../../application/useCases/user/CreateUser.ts";
import { GetUsers } from "../../application/useCases/user/GetUser.ts";
import User from "../../database/models/User.ts";
import { UpdateUser } from "../../application/useCases/user/UpdateUser.ts";
import { DeleteUser } from "../../application/useCases/user/DeleteUser.ts";

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
        
        const {name, age, job} = req.body;

        const createUser = new CreateUser(userService)

        try {

            const newUser = await createUser.execute({name, age, job})

            const bodyResponse: IBodyResponse = {
                data: newUser,
                message: 'User Created'
            }

            res.status(200).json(bodyResponse)

        } catch (error) {
            console.log(error)
            throw new Error('Bad Request')
        }
        

    }

    async updateUser(req: HttpRequest, res: HttpResponse): Promise<void> {
        
        const userToUpdate: Partial<User> = req.body.user

        const updateUser = new UpdateUser(userService)

        if (!userToUpdate.id) {
            throw new Error('Bad Request: ' + error')
        }

        const updatedUser = await updateUser.execute(userToUpdate.id, userToUpdate)

        const bodyResponse: IBodyResponse = {
            data: updatedUser,
            message: 'User Created'
        }

        res.status(200).json(bodyResponse)

    }
    
    async deleteUser(req: HttpRequest, res: HttpResponse): Promise<void> {
        
        const { id } = req.body;

        const deleteUser = new DeleteUser(userService)

        try {
            
            await deleteUser.execute(id)

            const bodyResponse: IBodyResponse = {
                data: null,
                message: 'User Deleted'
            }

            res.status(200).json(bodyResponse)

        } catch (error) {
            throw new Error('Bad Request: ' + error)
        }

    }

}