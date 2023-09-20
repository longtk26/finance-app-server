import { Request, Response } from "express";
import { getAllCategories } from "../services/category.service.js";

export const getCategories = async (req: Request, res: Response) => {
    try {
        const categories = await getAllCategories();

        res.status(200);
        res.json({ data: categories });
    } catch (error) {
        res.status(500);
        res.json({ error });
    }
};
