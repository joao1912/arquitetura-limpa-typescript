import { IOrmUserRepository } from "../../../database/repositories/OrmUserRepository";

export class GetUser {

    constructor(protected ormUserRepository: IOrmUserRepository) {}

    async execute(id: string) {

        return this.ormUserRepository.findById(id)

    }

}