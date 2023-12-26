import { IUser } from "../../domain/repositories/userRepository"
import { IOrmUserRepository } from "../../database/repositories/OrmUserRepository"
import UserModel from "../../database/models/User"
import { User } from "../../domain/entities/User"


class UsersInMemory implements IOrmUserRepository {

    public memory: IUser[]

    constructor() {
        this.memory = []
    }

    private createId(): string {

        const newId = Math.floor(Math.random() * 100000)

        return newId.toString()

    }

    findAll(): Promise<IUser[]> {

        const users = this.memory

        return Promise.resolve(users)

    }

    findById(id: string): Promise<IUser> {
        
        let user = this.memory.filter(user => user.id == id)

        if (!user.length) {
            throw new Error('User not found')
        }

        return Promise.resolve(user[0])

    }

    findByName(name: string): Promise<IUser> {
        
        let user = this.memory.filter(user => user.name == name)

        if (!user.length) {
            throw new Error('User not found')
        }

        return Promise.resolve(user[0])

    }

    create(user: User): Promise<IUser> {
        
        const name = user.getName()
        const age = user.getAge()
        const job = user.getJob()

        const newUser: IUser = {
            id: this.createId(),
            name,
            age,
            job
        }

        this.memory.push(newUser)

       return Promise.resolve(newUser)

    }
    update(id: string, newValue: Partial<IUser>): Promise<IUser | null> {
        throw new Error("Method not implemented.")
    }
    delete(id: string): void {
        throw new Error("Method not implemented.")
    }

}

export default UsersInMemory