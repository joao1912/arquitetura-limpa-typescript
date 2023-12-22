import UserRepository from "../repositories/userRepository";

export class User implements UserRepository {

    private name: string;
    private age: number;
    private job: string;
  
    constructor(name: string, job: string, age: number) {
      this.name = name;
      this.age = age;
      this.job = job;
    }

    getName(): string {

        return this.name;

    }
    getAge(): number {

        return this.age;

    }
    getJob(): string {
        
        return this.job;

    }
    setName(name: string): void {
        
        this.name = name;

    }
    setAge(age: number): void {
        
        this.age = age;

    }
    setJob(job: string): void {
        
        this.job = job;

    }

}