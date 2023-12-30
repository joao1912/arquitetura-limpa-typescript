import UserModel from "../../../database/models/User";
import { IOrmUserRepository } from "../../../database/repositories/OrmUserRepository";
import { IUser } from "../../../domain/repositories/userRepository";


export class UpdateUser {

    constructor(protected ormUserRepository: IOrmUserRepository) {}

    async execute(id: string, newValues: Partial<IUser>): Promise<IUser | null> {

        try {

            return await this.ormUserRepository.update(id, newValues)
            
        } catch (error) {
            throw new Error('The server failed in update user')
        }

    }
}