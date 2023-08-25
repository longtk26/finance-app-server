import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const protect = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const bearer = req.headers.authorization;

    if (!bearer) {
        res.status(401);
        res.send("Not authorized!");
        return;
    }

    const [, token] = bearer.split(" ");

    if (!token) {
        res.status(401);
        res.send("Not authorized!");
        return;
    }

    try {
        const payload = jwt.verify(token, process.env.SECRET_JWT!);
        req.user = payload;

        next();
        return;
    } catch (error) {
        console.log(error);
        res.status(401);
        res.send("Not authorized!");
        return;
    }
};
