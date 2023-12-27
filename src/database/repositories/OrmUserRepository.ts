import UserModel from "../models/User";
import { IUser } from "../../domain/repositories/userRepository";
import { User } from "../../domain/entities/User";
import { IUserCreated } from "../../application/useCases/user/CreateUser";
import { WhereOptions } from "sequelize";

export interface IOrmUserRepository {

    findAll(): Promise<IUser[]>

    findById(id: string): Promise<IUser> 

    findByName(name: string): Promise<IUser> 

    create(user: User): Promise<IUserCreated> 

    update(id: string, newValue: Partial<IUser>): Promise<IUser | null> 

    delete(id: string): void

    deleteAll(config?: IConfigDestroy): void

}

export interface IConfigDestroy {
    truncate: boolean,
    where: WhereOptions
}

export interface IUserNormilized extends Omit<UserModel, 'createdAt' | 'updatedAt'> {
    updatedAt?: string,
    createdAt?: string
}

export class OrmUserRepository implements IOrmUserRepository {

    private normalizeUser(user: UserModel | null) {

        if (!user) {
            throw new Error('User not found')
        }

        const {createdAt, updatedAt, ...userNormalized} = user.dataValues

        return userNormalized

    }

    async findAll(): Promise<IUser[]> { 
        try {

            const users = await UserModel.findAll() 

            if (!users) {
                throw new Error('Users not found')
            }

            const usersAsUsers: IUser[] = users.map((user: UserModel) => {
                
                return {
                    id: user.id,
                    name: user.name,
                    age:  user.age,
                    job: user.job
                }
            });

            return usersAsUsers;

        } catch (error) {
            throw new Error('Internal Server Error: ' + error)
        }
    }

    async findById(id: string): Promise<IUser> {

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

    async findByName(name: string): Promise<IUser> {

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

    async create(user: User): Promise<IUserCreated> {
        
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

    async update(id: string, newValue: Partial<IUser>): Promise<IUser | null> {

        try {
            
            const user = await UserModel.findByPk(id)

            await user?.update(newValue)

            return this.normalizeUser(user)

        } catch (error) {
            throw new Error('Internal Server Error: ' + error)
        }
    }

    async delete(id: string): Promise<void> {
        
        try {
            
            await UserModel.destroy({
                where: {
                    id: id
                }
            })

        } catch (error) {
            throw new Error('Bad Request: ' + error)
        }
    }

    async deleteAll(config: IConfigDestroy) {
        try {
            
            await UserModel.destroy(config)

        } catch (error) {
            throw new Error('Bad Request: ' + error)
        }
    }

}