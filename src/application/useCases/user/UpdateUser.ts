import { IOrmUserRepository } from "../../../database/repositories/OrmUserRepository.ts";
import { IUser } from "../../../domain/repositories/userRepository.ts";


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