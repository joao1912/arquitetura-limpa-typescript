import { IOrmUserRepository } from "../../../database/repositories/OrmUserRepository.ts";

export class GetUsers {

    constructor(protected ormUserRepository: IOrmUserRepository) {}

    async execute(id?: string) {

        if (id) {

            return this.ormUserRepository.findById(id)

        } else {

            return this.ormUserRepository.findAll()

        }

        
    }

}