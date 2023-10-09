import { Router } from "express";
import authRoute from "./auth.route.js";
import transacRoute from "./transactions.route.js";
import categoryRoute from "./category.route.js";
import { protect } from "../middleware/protect.js";

const rootRoute = Router();

rootRoute.use("/auth", authRoute);

// Authentication
rootRoute.use("/transactions/", protect, transacRoute);
rootRoute.use("/categories/", protect, categoryRoute);

export default rootRoute;
