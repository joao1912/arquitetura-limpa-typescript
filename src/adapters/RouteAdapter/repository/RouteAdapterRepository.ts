import { RequestHandler } from "express"


export interface RouteAdapterRepository {
    
    get( path: string, controller: () => Promise<any>, middleware?: RequestHandler ): void

    post( path: string, controller: () => Promise<any>, middleware?: RequestHandler ): void

    put( path: string, controller: () => Promise<any>, middleware?: RequestHandler ): void

    patch( path: string, controller: () => Promise<any>, middleware?: RequestHandler ): void

    delete( path: string, controller: () => Promise<any>, middleware?: RequestHandler ): void

}