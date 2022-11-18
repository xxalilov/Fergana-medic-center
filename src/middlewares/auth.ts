import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";
import {asyncHandler} from "./async";
import {UnauthorizedError} from "../errors/unauthorized-error";
import config from "../config/config";

interface UserPayload {
    id: string;
    email: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: UserPayload;
        }
    }
}

export const protect = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        let token;

        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1];
        } else if (req.cookies.token) {
            token = req.cookies.token;
        }
        if (!token) {
            throw new UnauthorizedError("No authorize to access this route");
        }

        try {
            // Verify token
            const decoded = jwt.verify(token, config.JWT_SECRET) as UserPayload;
            req.user = decoded;
            next();
        } catch (err) {
            throw new UnauthorizedError("No authorize to access this route");
        }
    }
);
