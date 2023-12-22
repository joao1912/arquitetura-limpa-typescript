import { OrmUserRepository } from "../../../database/repositories/OrmUserRepository";
import User from "../../../database/models/User";

export class CreateUser {

    name: string
    age: number
    job?: string

    constructor(name: string, age: number, job: string = '') {

        this.name = name
        this.age = age
        this.job = job

    }

    async execute(): Promise<User> {

        const ormUserRepository = new OrmUserRepository()

        const newUser = {

            name: this.name,
            age: this.age,
            job: this.job 

        }

        return await ormUserRepository.create(newUser)

    }

}