import { Router } from "express";
import { getCategories } from "../handlers/category.js";
import asyncHandler from "../helpers/asyncHandler.js";

const categoryRoute = Router();

categoryRoute.get("/", asyncHandler(getCategories));

export default categoryRoute;
