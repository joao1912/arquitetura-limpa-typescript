import UserRepository, { IUser } from "../repositories/userRepository";

export class User implements UserRepository {

    

    getAll(): Promise<IUser[]> {
        throw new Error("Method not implemented.");
    }
    getById(id: string): Promise<IUser[]> {
        throw new Error("Method not implemented.");
    }
    getByName(name: string): Promise<IUser[]> {
        throw new Error("Method not implemented.");
    }
    
}