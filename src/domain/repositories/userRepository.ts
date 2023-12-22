export interface IUser {
    id: string,
    name: string,
    age: number,
    job?: string
}

export default interface UserRepository {
    
    getAll(): Promise<IUser[]>

    getById(id: string): Promise<IUser[]>

    getByName(name: string): Promise<IUser[]>

}