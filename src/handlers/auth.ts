import { NextFunction, Request, Response } from "express";
import crypto from "crypto";
import path from "path";
import __dirname from "../dirname.js";

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
import EmailService from "../services/email.service.js";
import { createKeyToken } from "../services/keyTokens.service.js";

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
        // Update user with new password
        const hashPass = await hashPassword(req.body.password);
        const infoUpdate = {
            password: hashPass,
        };
        const userInfo = { id: user.id, email: user.email };
        await updateUser(req.body.email, infoUpdate);

        // Create token for login
        const token = generateToken(userInfo);

        return new SuccessResponse({
            message: "Register successful!",
            metadata: { token, user: userInfo },
        }).send(res);
    }

    const hashPass = await hashPassword(req.body.password);
    const userId = await createUser(req.body.email, hashPass);
    const userInfo = { id: userId, email: req.body.email };

    // Create token for login and key for activate
    const token = generateToken(userInfo);
    const keyActive = crypto.randomBytes(64).toString("hex");
    await createKeyToken(keyActive, userId);

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

export const sendEmail = async (req: any, res: Response) => {
    await EmailService.sendEmail(req.body.email, req.user.id);

    return new SuccessResponse({
        message: "Send email successful!",
        statusCode: 201,
        metadata: {
            msg: "You should receive an email",
        },
    }).send(res);
};

export const verifyEmail = async (req: Request, res: Response) => {
    const email = req.query.email as string;
    const token = req.query.token as string;

    if (!email || !token)
        throw new AuthFailureError("Email or token are missing!");

    const data = await EmailService.verifyEmail({ email, token });

    return new SuccessResponse({
        message: "Verify successful!",
        statusCode: 201,
        metadata: {
            data,
        },
    }).sendFile(res, path.join(__dirname, "/mails/index.html"));
};
