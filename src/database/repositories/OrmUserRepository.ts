import UserModel from "../models/User";
import { IUser } from "../../domain/repositories/userRepository";
import { User } from "../../domain/entities/User";

export interface IOrmUserRepository {

    findAll(): Promise<UserModel[]>

    findById(id: number): Promise<UserModel> 

    findByName(name: string): Promise<UserModel> 

    create(user: User): Promise<UserModel> 

    update(id: string, newValue: Partial<IUser>): Promise<UserModel | null> 

}

export class OrmUserRepository implements IOrmUserRepository {

    async findAll(): Promise<UserModel[]> { 
        try {

            const user = await UserModel.findAll() 

            if (!user) {
                throw new Error('Users not found')
            }

            return user

        } catch (error) {
            throw new Error('Internal Server Error: ' + error)
        }
    }

    async findById(id: number): Promise<UserModel> {

        try {

            const user = await UserModel.findByPk(id) 

            if (!user) {
                throw new Error('User not found')
            }

            return user

        } catch (error) {
            throw new Error('Internal Server Error: ' + error)
        }

    }

    async findByName(name: string): Promise<UserModel> {

        try {

            const user = await UserModel.findOne({
                where: {
                    name: name
                }
            })

            if (!user) {
                throw new Error('User not found')
            }

            return user

        } catch (error) {
            throw new Error('Internal Server Error: ' + error)
        }

    }

    async create(user: User): Promise<UserModel> {
        
        try {

            const name = user.getName()
            const age = user.getAge()
            const job = user.getJob()
            
            return await UserModel.create({
                name,
                age,
                job
            })

        } catch (error) {
            throw new Error('Internal Server Error: ' + error)
        }

    }

    async update(id: string, newValue: Partial<IUser>): Promise<UserModel | null> {

        try {
            
            const user = await UserModel.findByPk(id)

            await user?.update(newValue)

            return user

        } catch (error) {
            throw new Error('Internal Server Error: ' + error)
        }
    }

}