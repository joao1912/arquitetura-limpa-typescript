import { IOrmUserRepository } from "../../../database/repositories/OrmUserRepository";


export class DeleteUser {

    constructor(protected ormUserRepository: IOrmUserRepository) {}

    async execute(id: string) {

        try {
            
            this.ormUserRepository.delete(id)

        } catch (error) {

            throw new Error('Bad Request: can not delete user')
        }

    }

}