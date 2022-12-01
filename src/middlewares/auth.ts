import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";
import {asyncHandler} from "./async";
import {UnauthorizedError} from "../errors/unauthorized-error";
import config from "../config/config";

interface UserPayload {
    id: string;
    role: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: UserPayload;
        }
    }
}

export const superadmin = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    let token = getToken(req);

    try {
        const decoded = jwt.verify(token, config.JWT_SECRET) as UserPayload;
        if (decoded.role == 'superadmin') {
            req.user = decoded;
            next();
        } else {
            throw new UnauthorizedError("No authorize to access this route");
        }

    } catch (err) {
        throw new UnauthorizedError("No authorize to access this route");
    }
})

export const adminProtect = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    let token = getToken(req);

    try {
        const decoded = jwt.verify(token, config.JWT_SECRET) as UserPayload;
        if (decoded.role == 'admin' || decoded.role == 'superadmin' || decoded.role == 'cachier') {
            req.user = decoded;
            next();
        } else {
            throw new UnauthorizedError("No authorize to access this route");
        }

    } catch (err) {
        throw new UnauthorizedError("No authorize to access this route");
    }
});

export const doctorProtect = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    let token = getToken(req);

    try {
        const decoded = jwt.verify(token, config.JWT_SECRET) as UserPayload;
        if (decoded.role == 'superadmin' || decoded.role == 'user') {
            req.user = decoded;
            next();
        } else {
            throw new UnauthorizedError("No authorize to access this route");
        }

    } catch (err) {
        throw new UnauthorizedError("No authorize to access this route");
    }
});

export const protect = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        let token = getToken(req);

        try {
            const decoded = jwt.verify(token, config.JWT_SECRET) as UserPayload;
            req.user = decoded;
            next();
        } catch (err) {
            throw new UnauthorizedError("No authorize to access this route");
        }
    }
);

function getToken(req: Request) {
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

    return token;
}