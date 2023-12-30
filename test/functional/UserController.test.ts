import request from "supertest"
import { ExpressAdapter } from "../../src/adapters/HTTPAdapter/ExpressAdapter"

const HttpAdapter = new ExpressAdapter()
const app = HttpAdapter.getApp()

const userByCreate = {
    name: '_teste_',
    age: 0,
    job: 'tester'
}

describe('this test will execute methods from controller', () => {

    beforeAll(async () => {

        

    })

    it('should return all users', async () => {

        const users = await request(app).get('/users/')

        
    })

})