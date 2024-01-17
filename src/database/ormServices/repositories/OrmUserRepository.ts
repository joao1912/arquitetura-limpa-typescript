import { IUser } from "../../../domain/repositories/userRepository.ts";
import { User } from "../../../domain/entities/User.ts";
import { IUserCreated } from "../../../application/useCases/user/CreateUser.ts";

export interface IOrmUserRepository {

    findAll(): Promise<IUser[]>

    findById(id: string): Promise<IUser> 

    findByName(name: string): Promise<IUser> 

    create(user: User): Promise<IUserCreated> 

    update(id: string, newValue: Partial<IUser>): Promise<IUser | null> 

    delete(id: string): void

    deleteAll(config?: any): void

}

