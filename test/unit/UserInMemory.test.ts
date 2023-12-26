import { CreateUser } from "../../src/application/useCases/user/CreateUser"
import UsersInMemory from "../../src/interfaces/in-memory/UsersInMemory"
const userService = new UsersInMemory()


const userTest = {

    name: 'nome_teste',
    age: 0,
    job: 'tester'

}

let idUserTest: string

describe('this will test the user use cases in memory', () => {

    beforeAll(async () => {

        const createUser = new CreateUser(userService)

        const reponse = await createUser.execute(userTest)

        idUserTest = reponse.id
            
    })

    it('shoud return a new user saved in memory', async () => {

        const createUser = new CreateUser(userService)

        const user = {
            name: 'joão',
            age: 19,
            job: 'developer'
        }

        const newUser = await createUser.execute(user)

        expect(newUser).toHaveProperty('id')

    })

    it('should return all users from memory', async () => {

        const allUsers = await userService.findAll()

        const userFound = allUsers.some(user => (
            user.name === userTest.name &&
            user.age === userTest.age &&
            user.job === userTest.job
        ));

        expect(Array.isArray(allUsers)).toBe(true);
        expect(allUsers.length).toBeGreaterThan(0);
        expect(userFound).toBe(true);

    })

    it('should return a user by id', async () => {

        const user = await userService.findById(idUserTest)

        expect(user).toEqual({
            id: idUserTest,
            name: userTest.name,
            age: userTest.age,
            job: userTest.job
        })

    })

    it('should return a user by name', async () => {

        const user = await userService.findByName(userTest.name)

        expect(user).toEqual({
            id: idUserTest,
            name: userTest.name,
            age: userTest.age,
            job: userTest.job
        })

    })

    afterAll( () => {

        userService.deleteAll()

    })

})