import { IUser } from "../../domain/repositories/userRepository.ts"
import { IOrmUserRepository } from "../../database/repositories/OrmUserRepository.ts"
import { User } from "../../domain/entities/User.ts"
import { IUserCreated } from "../../application/useCases/user/CreateUser.ts"


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

                //userUpdated[prop] = newValue[prop]

            } else {

                //userUpdated[prop] = users[index][prop]

            }
            
        }

        users.splice(index, 1, userUpdated)

        this.memory = users

        return Promise.resolve(userUpdated)

    }

    delete(id: string): void {
        
        const users = [...this.memory]

        try {
            
            const usersMemoryUpdated = users.filter(user => user.id != id)
            this.memory = usersMemoryUpdated

        } catch (error) {
            throw new Error('The server failed to delete a user by ID')
        }

    }

    deleteAll(): void {
        this.memory = []
    }

}

export default UsersInMemory