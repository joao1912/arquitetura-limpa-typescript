import request from "supertest"
import { ExpressAdapter } from "../../src/adapters/HTTPAdapter/ExpressAdapter"
import { CreateUser } from "../../src/application/useCases/user/CreateUser"
import { OrmUserRepository } from "../../src/database/repositories/OrmUserRepository"

const HttpAdapter = new ExpressAdapter()
const app = HttpAdapter.getApp()

const userByCreate = {
    name: '_teste_',
    age: 0,
    job: 'tester'
}

describe('this test will execute methods from controller', () => {

    it('should return all users', async () => {

        const users = await request(app)
            .get('/users/')

        expect(users.status).toBe(200)

        
    })

    it('should create a user and return this user with id', async () => {
      
        const response = await request(app)
            .post('/users/add')
            .send(userByCreate)

        expect(3 + 3).toBe(200)
        expect(response.body).toHaveProperty('id')

    })

})