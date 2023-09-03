import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const protect = async (req: any, res: Response, next: NextFunction) => {
    const bearer = req.headers.authorization;

    if (req.isAuthenticated()) {
        req.user = {
            id: req.user?.id,
            email: req.user?.emails[0]?.value,
            image: req.user?.photos[0]?.value,
            provider: req.user?.provider,
        };

        next();
        return;
    }

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
