import { Request, Response } from "express";
import {
    findUserByEmail,
    createUser,
    updateUser,
} from "../services/users.service";
import { comparePassword, generateToken, hashPassword } from "../utils";

export const login = async (req: Request, res: Response) => {
    try {
        const user = await findUserByEmail(req.body.email);
        const userInfo = { email: req.body.email };

        if (user) {
            const isPassword = await comparePassword(
                req.body.password,
                user.password
            );

            if (isPassword) {
                const token = generateToken(userInfo);
                res.json({
                    message: "Login successful!",
                    token,
                    user: { email: user.email },
                });
            } else {
                res.status(401);
                res.json({ message: "Credentials are invalid!" });
            }
        } else {
            res.status(401);
            res.json({ message: "Credentials are invalid!" });
        }
    } catch (error) {
        console.log(error);
    }
};

export const register = async (req: Request, res: Response) => {
    try {
        const user = await findUserByEmail(req.body.email);
        const userInfo = { email: req.body.email };

        if (user && user.password) {
            res.status(409);
            res.json({ message: "User already registered!" });
        } else if (user && !user.password) {
            const hashPass = await hashPassword(req.body.password);
            const infoUpdate = {
                password: hashPass,
            };

            await updateUser(req.body.email, infoUpdate);
            const token = generateToken(userInfo);

            res.json({
                message: "Register successful!",
                token,
                user: { email: user.email },
            });
        } else {
            const hashPass = await hashPassword(req.body.password);
            await createUser(req.body.email, hashPass);

            const token = generateToken(userInfo);
            res.json({
                message: "Register successful!",
                token,
                user: { email: req.body.email },
            });
        }
    } catch (error) {
        console.log(error);
    }
};

export const loginSuccess = (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
        res.status(200).json({
            success: true,
            message: "successfull",
            user: req.user,
        });
    } else {
        res.status(401).json({
            success: false,
            message: "user not authenticated",
        });
    }
};
