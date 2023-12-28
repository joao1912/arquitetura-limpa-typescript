import { IOrmUserRepository } from "../../../database/repositories/OrmUserRepository";

export class GetAllUsers {

    constructor(protected ormUserRepository: IOrmUserRepository) {}

    async execute() {

       
        return this.ormUserRepository.findAll()

        
    }

}