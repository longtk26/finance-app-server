import { Router } from "express";
import {
    getTransacts,
    newTransact,
    updateTransact,
    deleteTransact,
} from "../handlers/transactions.js";

const transacRoute = Router();

// Need to add validate later
// Default get transactions for months
transacRoute.get("/:userId", getTransacts);
transacRoute.post("/:userId/new", newTransact);
transacRoute.patch("/:userId/:id", updateTransact);
transacRoute.delete("/:userId/:id", deleteTransact);

export default transacRoute;
