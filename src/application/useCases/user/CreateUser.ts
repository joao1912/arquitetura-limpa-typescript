import { IOrmUserRepository } from "../../../database/repositories/OrmUserRepository";
import { IUser } from "../../../domain/repositories/userRepository";
import { User } from "../../../domain/entities/User";

export interface IUserCreated extends IUser {
    id: string
}

export class CreateUser {

    constructor(protected ormUserRepository: IOrmUserRepository) {}

    async execute(user: IUser): Promise<IUserCreated> {

        const newUser = new User(user.name, user.job, user.age)

        const result = await this.ormUserRepository.create(newUser)

        return result
            
    }

}