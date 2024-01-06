import { NextFunction } from "express";
import { HttpRequest } from "../../interfaces/controllers/Ports/HttpRequest.ts";
import { HttpResponse } from "../../interfaces/controllers/Ports/HttpResponse.ts";
import { authenticatorAdapterRepository } from "./repository/authenticatorAdapterRepository.ts";
import * as jwt from "jsonwebtoken"


export class AuthJwt implements authenticatorAdapterRepository {

    async auth(req: HttpRequest, res: HttpResponse, next: NextFunction): Promise<void> {

        const SECRET_KEY = process.env.JWT_SECRETKEY || ''

        if (!SECRET_KEY) {
            throw new Error('internal server error')
        }
        
        try {
            const token = req.header('Authorization')
         
            if (!token) {
              throw new Error();
            }
         
            const decoded = jwt.verify(token, SECRET_KEY);
            (req as HttpRequest).token = decoded;
         
            next();
        } catch (err) {
            throw new Error('Unauthorized')
        }

    }

    createToken(id: string): string {

        const secret_key = process.env.JWT_SECRETKEY

        if (!secret_key) {
            throw new Error('internal server error')
        }

        const token = jwt.sign({id: id}, secret_key as string, {expiresIn: 1000})

        return token
        
    }

}