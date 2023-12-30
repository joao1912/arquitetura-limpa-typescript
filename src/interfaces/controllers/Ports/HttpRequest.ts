import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
export interface HttpRequest extends Request {
    token?: JwtPayload | string
}