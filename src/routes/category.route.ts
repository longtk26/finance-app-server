import { Router } from "express";

const categoryRoute = Router();

categoryRoute.get("/", (req, res) => {
    res.send("Hello category!");
});

export default categoryRoute;
