import { IUserCreated } from "../../../application/useCases/user/CreateUser";
import { User } from "../../../domain/entities/User";
import { IUser } from "../../../domain/repositories/userRepository";
import { IOrmUserRepository } from "../repositories/OrmUserRepository"
import { PrismaClient } from "@prisma/client";
import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

interface IUserModel {
    id: number;
    name: string;
    age: number;
    job: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export class OrmPrismaUserRepository implements IOrmUserRepository {

    prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>

    constructor() {
        this.prisma = new PrismaClient ()
    }

    private normalizeUser(user: any) {

        if (!user) {
            throw new Error('User not found')
        }

        const {createdAt, updatedAt, ...userNormalized} = user.dataValues

        return userNormalized

    }

    async findAll(): Promise<IUser[]> {

        try {

            const users: IUserModel[] = await this.prisma.users.findMany() 

            if (!users) {
                throw new Error('Users not found')
            }

            const usersAsUsers: IUser[] = users.map((user: IUserModel) => {
                
                return {
                    id: (user.id).toString(),
                    name: user.name,
                    age:  user.age,
                    job: user.job || ''
                }
            });

            return usersAsUsers;

        } catch (error) {
            throw new Error('Internal Server Error: ' + error)
        }

    }

    async findById(id: string): Promise<IUser> {
        try {

            const user = await this.prisma.users.findUnique({
                where: {
                    id: Number(id)
                }
            })

            if (!user) {
                throw new Error('User not found')
            }

            return {
                id: (user.id).toString(),
                name: user.name,
                age:  user.age,
                job: user.job || ''
            }

        } catch (error) {
            throw new Error('Internal Server Error: ' + error)
        }
    }

    async findByName(name: string): Promise<IUser> {
        try {

            const user = await this.prisma.users.findFirst({
                where: {
                    name: name
                }
            })

            if (!user) {
                throw new Error('User not found')
            }

            return {
                id: (user.id).toString(),
                name: user.name,
                age:  user.age,
                job: user.job || ''
            }

        } catch (error) {
            throw new Error('Internal Server Error: ' + error)
        }
    }

    async create(user: User): Promise<IUserCreated> {

        try {

            const name = user.getName()
            const age = user.getAge()
            const job = user.getJob()
            
            const newUser = await this.prisma.users.create({
                data: {
                    name,
                    age,
                    job
                }
            })

            return {
                id: (newUser.id).toString(),
                name: newUser.name,
                age:  newUser.age,
                job: newUser.job || ''
            }

        } catch (error) {
            throw new Error('Internal Server Error: ' + error)
        }

    }

    async update(id: string, newValue: Partial<IUser>): Promise<IUser | null> {
        try {
            
            const user = await this.prisma.users.update({
                where: {
                    id: Number(id)
                },
                data: {
                    ...newValue,
                    id: undefined
                }
            })

            return this.normalizeUser(user)

        } catch (error) {
            throw new Error('Internal Server Error: ' + error)
        }
    }

    async delete(id: string): Promise<void> {
        try {
            
            await this.prisma.users.delete({
                where: {
                    id: Number(id)
                }
            })

        } catch (error) {
            throw new Error('Bad Request: ' + error)
        }
    }

    async deleteAll(config?: any): Promise<void> {
        try {
            
            await this.prisma.users.deleteMany()

        } catch (error) {
            throw new Error('Bad Request: ' + error)
        }
    }
    
}