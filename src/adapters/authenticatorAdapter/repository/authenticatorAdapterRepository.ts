import { HttpRequest } from "../../../interfaces/controllers/Ports/HttpRequest"
import { HttpResponse } from "../../../interfaces/controllers/Ports/HttpResponse"
import { NextFunction } from "express"

export interface authenticatorAdapterRepository {

    auth(req: HttpRequest, res: HttpResponse, next: NextFunction)

    createToken(id: string): string
     
}