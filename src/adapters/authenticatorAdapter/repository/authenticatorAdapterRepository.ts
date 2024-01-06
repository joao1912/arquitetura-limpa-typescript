import { HttpRequest } from "../../../interfaces/controllers/Ports/HttpRequest.ts"
import { HttpResponse } from "../../../interfaces/controllers/Ports/HttpResponse.ts"
import { NextFunction } from "express"

export interface authenticatorAdapterRepository {

    auth(req: HttpRequest, res: HttpResponse, next: NextFunction): Promise<void>

    createToken(id: string): string
     
}