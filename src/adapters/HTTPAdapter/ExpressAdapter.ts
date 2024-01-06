import { HTTPAdapterRepository } from "./repository/HTTPAdapterRepository.ts";
import { Application, Request, Response, NextFunction } from "express";
import express from "express"
import userRoute from "../../interfaces/routes/userRoute.ts";
import 'express-async-errors';

export class ExpressAdapter implements HTTPAdapterRepository {

    private app: Application;

    constructor() {
      
        this.app = express()
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
        this.app.use(
            (err: Error, request: Request, response: Response, next: NextFunction) => {
              if (err instanceof Error) {
                return response.status(400).json({
                  message: err.message,
                });
              }
              return response.status(500).json({
                status: "error",
                message: `Internal server error - ${err}`,
              });
            }
        );

    }

    public setRoutes(): void {

        this.app.use('/users', userRoute)

    }

    public getApp(): Application {
      this.setRoutes()
      return this.app
    }

}