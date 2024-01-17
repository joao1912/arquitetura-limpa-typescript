import request from 'supertest';
import { ExpressAdapter } from "../../src/adapters/HTTPAdapter/ExpressAdapter.ts"
import { CreateUser } from '../../src/application/useCases/user/CreateUser.ts';
import { OrmUserRepository } from '../../src/database/ormServices/repositories/OrmUserRepository.ts';
import { AuthJwt } from '../../src/adapters/authenticatorAdapter/AuthJwt.ts';


const HttpAdapter = new ExpressAdapter()

const userByCreate = {
    name: '_teste_',
    age: 0,
    job: 'tester'
}

const app = HttpAdapter.getApp()
let adminId: string

describe('this test will execute methods from controller', () => {

    beforeAll(async () => {

        const createUser = new CreateUser(new OrmUserRepository())

        const userAdmin = {
            name: 'admin',
            age: 0,
            job: 'admin'
        }

        createUser.execute(userAdmin)
            .then(response => {
                adminId = response.id
            })

    })

    it('should return all users', async () => {

        const authService = new AuthJwt() 
        const token = authService.createToken(adminId)

        const users = await request(app)
            .get('/users')
            .set('Authorization', token)

        expect(users.status).toBe(200)
        expect(users.body).toBeTruthy()
       
        
    })

    it('should create a user and return this user with id', async () => {
      
        const response = await request(app)
            .post('/users/add')
            .send(userByCreate)
          
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('id')
     
    })

})