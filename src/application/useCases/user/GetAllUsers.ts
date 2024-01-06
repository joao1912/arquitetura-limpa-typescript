import { IOrmUserRepository } from "../../../database/repositories/OrmUserRepository.ts";

export class GetAllUsers {

    constructor(protected ormUserRepository: IOrmUserRepository) {}

    async execute() {

       
        return await this.ormUserRepository.findAll()

        
    }

}