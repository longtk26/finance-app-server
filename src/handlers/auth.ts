import { Request, Response } from "express";
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

export const login = async (req: Request, res: Response) => {
    try {
        const user = await findUserByEmail(req.body.email);

        if (user) {
            const isPassword = await comparePassword(
                req.body.password,
                user.password
            );
            const userInfo = { id: user.id, email: user.email };

            if (isPassword) {
                const token = generateToken(userInfo);
                res.json({
                    message: "Login successful!",
                    token,
                    user: userInfo,
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

        if (user && user.password) {
            res.status(409);
            res.json({ message: "User already registered!" });
        } else if (user && !user.password) {
            const hashPass = await hashPassword(req.body.password);
            const infoUpdate = {
                password: hashPass,
            };
            const userInfo = { id: user.id, email: user.email };

            await updateUser(req.body.email, infoUpdate);
            const token = generateToken(userInfo);

            res.json({
                message: "Register successful!",
                token,
                user: userInfo,
            });
        } else {
            const hashPass = await hashPassword(req.body.password);
            const userId = await createUser(req.body.email, hashPass);
            const userInfo = { id: userId, email: req.body.email };

            const token = generateToken(userInfo);
            res.json({
                message: "Register successful!",
                token,
                user: userInfo,
            });
        }
    } catch (error) {
        console.log(error);
    }
};

export const loginSuccess = (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: "successfull",
        user: req.user,
    });
};
