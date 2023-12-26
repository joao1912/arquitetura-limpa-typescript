import { IOrmUserRepository } from "../../../database/repositories/OrmUserRepository";
import UserModel from "../../../database/models/User";
import { IUser } from "../../../domain/repositories/userRepository";
import { User } from "../../../domain/entities/User";

export class CreateUser {

    constructor(protected ormUserRepository: IOrmUserRepository) {}

    async execute(user: IUser): Promise<IUser> {

        const newUser = new User(user.name, user.job, user.age)

        const result = await this.ormUserRepository.create(newUser)

        return result
            
    }

}