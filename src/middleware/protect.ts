import { Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { findUserByEmail } from "../services/users.service.js";
import asyncHandler from "../helpers/asyncHandler.js";
import { AuthFailureError } from "../core/error.response.js";

export const protect = asyncHandler(
    async (req: any, res: Response, next: NextFunction) => {
        const bearer = req.headers.authorization;

        if (req.isAuthenticated()) {
            const idUser = await findUserByEmail(req.user?.emails[0]?.value);

            req.user = {
                id: idUser,
                email: req.user?.emails[0]?.value,
                image: req.user?.photos[0]?.value,
                provider: req.user?.provider,
            };

            next();
            return;
        }

        if (!bearer) throw new AuthFailureError("Not authorized!");

        const [, token] = bearer.split(" ");

        if (!token) throw new AuthFailureError("Not authorized!");

        try {
            const payload = jwt.verify(
                token,
                process.env.SECRET_JWT!
            ) as JwtPayload;
            req.user = payload;

            next();
            return;
        } catch (error) {
            console.log(error);
            throw new AuthFailureError("Not authorized!");
        }
    }
);
