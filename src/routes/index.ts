import { Router } from "express";
import authRoute from "./auth.route.js";
import transacRoute from "./transactions.route.js";
import { protect } from "../middleware/protect.js";

const rootRoute = Router();

rootRoute.use("/auth", authRoute);
rootRoute.use("/transactions/", protect, transacRoute);

export default rootRoute;
