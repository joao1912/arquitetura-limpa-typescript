import { HTTPAdapterRepository } from "./repository/HTTPAdapterRepository";
import express, { Application, Router } from "express";
import userRoute from "../../interfaces/routes/userRoute"


export class ExpressAdapter implements HTTPAdapterRepository {

    private app: Application;

    constructor() {
        this.app = express();
    }

    public use(handler: any): void {
        this.app.use(handler);
    }

    public listen(port: number, callback: () => void ): void {
        this.app.listen(port, callback);
    }

    public config(): void {

        this.app.use(express.json())
        this.app.use(express.urlencoded({extended: true}))

    }

    public setRoutes() {

        this.app.use('/users', userRoute)

    }

}