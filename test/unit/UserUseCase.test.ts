import { CreateUser } from "../../src/application/useCases/user/CreateUser"
import UsersInMemory from "../../src/interfaces/in-memory/UsersInMemory"
import { OrmUserRepository } from "../../src/database/repositories/OrmUserRepository"

describe('this will test the user use cases', () => {

    it('shoud return a new user saved in memory', async () => {

        const userService = new UsersInMemory()
        const createUser = new CreateUser(userService)

        const user = {
            name: 'joão',
            age: 19,
            job: 'developer'
        }

        const newUser = await createUser.execute(user)

        expect(newUser).toHaveProperty('id')

    })

    it('shoud return a new user saved in database', async () => {

        const userService = new OrmUserRepository()
        const createUser = new CreateUser(userService)

        const user = {
            name: 'joão',
            age: 19,
            job: 'developer'
        }

        const newUser = await createUser.execute(user)
    
        expect(newUser).toHaveProperty('id')
    })

})