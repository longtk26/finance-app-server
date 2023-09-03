import { Router } from "express";
import authRoute from "./auth.route.js";

const rootRoute = Router();

rootRoute.use("/auth", authRoute);

export default rootRoute;
