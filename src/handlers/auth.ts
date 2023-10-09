import { NextFunction, Request, Response } from "express";
import {
    findUserByEmail,
    createUser,
    updateUser,
} from "../services/users.service.js";

import {
    comparePassword,
    generateToken,
    hashPassword,
} from "../utils/index.js";
import { SuccessResponse } from "../core/success.response.js";
import { AuthFailureError } from "../core/error.response.js";

export const login = async (req: Request, res: Response) => {
    const user = await findUserByEmail(req.body.email);

    if (!user) throw new AuthFailureError("Credentials are invalid!");

    const isPassword = await comparePassword(req.body.password, user.password);
    const userInfo = { id: user.id, email: user.email };

    if (!isPassword) throw new AuthFailureError("Credentials are invalid!");

    const token = generateToken(userInfo);
    return new SuccessResponse({
        message: "Login successful!",
        metadata: {
            token,
            user: userInfo,
        },
    }).send(res);
};

export const register = async (req: Request, res: Response) => {
    const user = await findUserByEmail(req.body.email);

    if (user && user.password)
        throw new AuthFailureError("Email already exists!");

    if (user && !user.password) {
        const hashPass = await hashPassword(req.body.password);
        const infoUpdate = {
            password: hashPass,
        };
        const userInfo = { id: user.id, email: user.email };

        await updateUser(req.body.email, infoUpdate);
        const token = generateToken(userInfo);

        return new SuccessResponse({
            message: "Register successful!",
            metadata: { token, user: userInfo },
        }).send(res);
    }

    const hashPass = await hashPassword(req.body.password);
    const userId = await createUser(req.body.email, hashPass);
    const userInfo = { id: userId, email: req.body.email };
    const token = generateToken(userInfo);

    return new SuccessResponse({
        message: "Register successful!",
        metadata: { token, user: userInfo },
    }).send(res);
};

export const loginSuccess = (req: Request, res: Response) => {
    return new SuccessResponse({
        message: "Login successful!",
        metadata: {
            success: true,
            user: req.user,
        },
    }).send(res);
};

export const logoutPassport = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
};
