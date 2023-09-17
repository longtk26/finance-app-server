import { Router } from "express";
import {
    getTransacts,
    newTransact,
    updateTransact,
    deleteTransact,
} from "../handlers/transactions.js";

const transacRoute = Router();

// Validate fields in object and check userId equals to current user

transacRoute.get("/:userId", getTransacts);
transacRoute.post("/:userId/new", newTransact);
transacRoute.patch("/:userId/:id", updateTransact);
transacRoute.delete("/:userId/:id", deleteTransact);

export default transacRoute;
