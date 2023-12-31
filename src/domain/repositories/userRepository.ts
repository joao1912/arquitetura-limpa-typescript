export interface IUser {
    id?: string,
    name: string,
    age: number,
    job: string
}

export default interface UserRepository {

    getId(): string | undefined

    getName(): string

    getAge(): number

    getJob(): string

    setName(name: string): void

    setAge(age: number): void

    setJob(job: string): void

}