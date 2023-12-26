import { IUser } from "../../domain/repositories/userRepository"
import { IOrmUserRepository } from "../../database/repositories/OrmUserRepository"
import { User } from "../../domain/entities/User"
import { IUserCreated } from "../../application/useCases/user/CreateUser"


class UsersInMemory implements IOrmUserRepository {

    private memory: IUser[] = []

    private createId(): string {

        const newId = Math.floor(Math.random() * 100000)

        return newId.toString()

    }

    findAll(): Promise<IUser[]> {

        const users = [...this.memory]

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

    create(user: User): Promise<IUserCreated> {
        
        const name = user.getName()
        const age = user.getAge()
        const job = user.getJob()

        const newUser: IUserCreated = {
            id: this.createId(),
            name,
            age,
            job
        }

        this.memory.push(newUser)

        return Promise.resolve(newUser)

    }

    update(id: string, newValue: Partial<IUserCreated>): Promise<IUserCreated> {

        const users = [...this.memory]
        
        const index = users.findIndex(user => user.id == id)

        if (index == -1) {
            
            throw new Error('User not found with that id')
            
        }

        let userUpdated = {} as IUserCreated;

        for (let prop in users[index]) {

            if (newValue.hasOwnProperty(prop)) {

                userUpdated[prop] = newValue[prop]

            } else {

                userUpdated[prop] = users[index][prop]

            }
            
        }

        return Promise.resolve(userUpdated)

    }

    delete(id: string): void {
        throw new Error("Method not implemented.")
    }

    deleteAll(): void {
        this.memory = []
    }

}

export default UsersInMemory