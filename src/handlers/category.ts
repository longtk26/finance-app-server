import { Request, Response } from "express";
import { getAllCategories } from "../services/category.service.js";
import { SuccessResponse } from "../core/success.response.js";

export const getCategories = async (req: Request, res: Response) => {
    const categories = await getAllCategories();

    return new SuccessResponse({
        message: "Categories retrieved successfully",
        metadata: categories,
    }).send(res);
};
