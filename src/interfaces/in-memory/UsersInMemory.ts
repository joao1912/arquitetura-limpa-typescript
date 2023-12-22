import { IUser } from "../../domain/repositories/userRepository"

class UsersInMemory {

    public memory: IUser[]

    constructor() {
        this.memory = []
    }

    getAll(): Promise<IUser[]> {

        const users = this.memory

        return Promise.resolve(users)

    }

    getById(id: string): Promise<IUser[]> {
        
        let user = this.memory.filter(user => user.id == id)

        if (!user.length) {
            throw new Error('User not found')
        }

        return Promise.resolve(user)

    }

    getByName(name: string): Promise<IUser[]> {
        
        let user = this.memory.filter(user => user.name == name)

        if (!user.length) {
            throw new Error('User not found')
        }

        return Promise.resolve(user)

    }

}

export default UsersInMemory