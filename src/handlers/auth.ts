import { Request, Response } from "express";

export const login = async (req: Request, res: Response) => {
    res.json({ message: "Login successful!" });
};

export const register = async (req: Request, res: Response) => {
    res.json({ message: "Register successful!" });
};

export const loginSuccess = async (req: Request, res: Response) => {
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
