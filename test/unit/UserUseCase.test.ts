import { CreateUser } from "../../src/application/useCases/user/CreateUser.ts"
import { DeleteUser } from "../../src/application/useCases/user/DeleteUser.ts"
import { GetAllUsers } from "../../src/application/useCases/user/GetAllUsers.ts"
import { UpdateUser } from "../../src/application/useCases/user/UpdateUser.ts"
import { OrmUserRepository } from "../../src/database/ormServices/repositories/OrmUserRepository.ts"

const userService = new OrmUserRepository()

const userTest = {
    name: 'test_user',
    age: 0,
    job: 'developer'
}

let idUserToUpdate: string
let idUserToDelete: string

describe('this will test the user use cases', () => {

    beforeAll(async () => {

        const createUser = new CreateUser(userService)

        const userToUpdate = await createUser.execute(userTest)
        const userToDelete = await createUser.execute(userTest)

        idUserToUpdate = userToUpdate.id
        idUserToDelete = userToDelete.id

    })

    it('shoud return a new user saved in database', async () => {

        
        const createUser = new CreateUser(userService)

        const newUser = await createUser.execute(userTest)
    
        expect(newUser).toHaveProperty('id')

    })

    it('should return a updated user in database', async () => {

        const updateUser = new UpdateUser(userService)

        const newValues = {
            name: 'updatedName',
            job: 'updatedJob'
        }

        const user = await updateUser.execute(idUserToUpdate, newValues)

        expect(user).toEqual({
            id: idUserToUpdate,
            name: newValues.name,
            age: userTest.age,
            job: newValues.job
        })

    })

    it('should not return error when delete a user', async () => {

        const deleteUser = new DeleteUser(userService)
      
        expect(async () => {await deleteUser.execute(idUserToDelete)}).not.toThrow('Bad Request: can not delete user')

    })

    it('should return at least one user', async () => {

        const getUsers = new GetAllUsers(userService)

        const result = await getUsers.execute()

        expect(result.length).toBeGreaterThan(1)

    })

    afterAll(async () => {

        await userService.deleteAll({ where: {}, truncate: true })

    })

})