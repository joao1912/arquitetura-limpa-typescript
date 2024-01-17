import { IOrmUserRepository } from "../../../database/ormServices/repositories/OrmUserRepository.ts";


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