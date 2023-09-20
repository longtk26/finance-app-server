import { Router } from "express";
import { getCategories } from "../handlers/category.js";

const categoryRoute = Router();

categoryRoute.get("/", getCategories);

export default categoryRoute;
