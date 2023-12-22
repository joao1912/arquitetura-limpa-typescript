import express, { Router, RequestHandler }  from "express";
import { RouteAdapterRepository } from './repository/RouteAdapterRepository'

export class RouteExpressAdapter implements RouteAdapterRepository {
    
    public router: Router;

    constructor() {
        this.router = express.Router();
    }

    private addMiddleware(path: string, middleware: RequestHandler) {
        this.router.use(path, middleware);
    }

    public get(path: string, controller: () => Promise<any>, middleware?: RequestHandler): void {

        if (middleware) {

            this.addMiddleware(path, middleware);

        }

        this.router.get(path, controller)
        
    }

    public post(path: string, controller: () => Promise<any>, middleware?: RequestHandler): void {

        if (middleware) {

            this.addMiddleware(path, middleware);

        }

        this.router.post(path, controller)
        
    }

    public put(path: string, controller: () => Promise<any>, middleware?: RequestHandler): void {
        if (middleware) {

            this.addMiddleware(path, middleware);

        }

        this.router.put(path, controller)
    }

    public patch(path: string, controller: () => Promise<any>, middleware?: RequestHandler): void {

        if (middleware) {

            this.addMiddleware(path, middleware);

        }

        this.router.patch(path, controller)

    }

    public delete(path: string, controller: () => Promise<any>, middleware?: RequestHandler): void {

        if (middleware) {

            this.addMiddleware(path, middleware);

        }

        this.router.delete(path, controller)

    }

}