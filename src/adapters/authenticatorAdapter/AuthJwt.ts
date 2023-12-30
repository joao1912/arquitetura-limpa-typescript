import { NextFunction } from "express";
import { HttpRequest } from "../../interfaces/controllers/Ports/HttpRequest";
import { HttpResponse } from "../../interfaces/controllers/Ports/HttpResponse";
import { authenticatorAdapterRepository } from "./repository/authenticatorAdapterRepository";
import jwt, {JwtPayload, Secret} from "jsonwebtoken"


export class AuthJwt implements authenticatorAdapterRepository {

    auth(req: HttpRequest, res: HttpResponse, next: NextFunction) {

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

        if (secret_key) {
            throw new Error('internal server error')
        }

        const token = jwt.sign({id: id}, secret_key as string, {expiresIn: 1000})

        return token
        
    }

}