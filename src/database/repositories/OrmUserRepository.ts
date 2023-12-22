import User from "../models/User";
import { IUser } from "../../domain/repositories/userRepository";

export class OrmUserRepository {

    async findAll(): Promise<User[]> { 
        try {

            const user = await User.findAll() 

            if (!user) {
                throw new Error('Users not found')
            }

            return user

        } catch (error) {
            throw new Error('Internal Server Error: ' + error)
        }
    }

    async findById(id: number): Promise<User> {

        try {

            const user = await User.findByPk(id) 

            if (!user) {
                throw new Error('User not found')
            }

            return user

        } catch (error) {
            throw new Error('Internal Server Error: ' + error)
        }

    }

    async findByName(name: string): Promise<User> {

        try {

            const user = await User.findOne({
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

    async create(newUser: Omit <IUser, 'id' >): Promise<User> {
        
        try {
            
            return await User.create(newUser)

        } catch (error) {
            throw new Error('Internal Server Error: ' + error)
        }

    }

    async update(id: string, newValue: Partial<IUser>): Promise<User | null> {

        try {
            
            const user = await User.findByPk(id)

            await user?.update(newValue)

            return user

        } catch (error) {
            throw new Error('Internal Server Error: ' + error)
        }
    }

}