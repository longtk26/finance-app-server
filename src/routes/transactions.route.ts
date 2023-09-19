import { Router } from "express";
import {
    getTransacts,
    newTransact,
    updateTransact,
    deleteTransact,
} from "../handlers/transactions.js";
import { validate } from "../validator/index.js";
import { body, checkExact, param } from "express-validator";

const transacRoute = Router();

transacRoute.get(
    "/:userId",
    validate([
        param("userId").custom((val, { req }) => val === req.user.id),
        body("time").notEmpty().isString(),
        checkExact(),
    ]),
    getTransacts
);

transacRoute.post(
    "/:userId/new",
    validate([
        param("userId").custom((val, { req }) => val === req.user.id),
        body("time").notEmpty().isString(),
        body("wallet").notEmpty().isString(),
        body("note").isString(),
        body("price").notEmpty().isInt(),
        body("category").notEmpty().isString(),
        checkExact(),
    ]),
    newTransact
);

transacRoute.patch(
    "/:userId/:id",
    validate([
        param("userId").custom((val, { req }) => val === req.user.id),
        body("time").optional().isString(),
        body("wallet").optional().isString(),
        body("note").optional().isString(),
        body("price").optional().isInt(),
        body("category").optional().isString(),
        checkExact([param("id").notEmpty()]),
    ]),
    updateTransact
);

transacRoute.delete(
    "/:userId/:id",
    validate([
        param("userId").custom((val, { req }) => val === req.user.id),
        param("id").notEmpty(),
        checkExact([param("id").notEmpty()]),
    ]),
    deleteTransact
);

export default transacRoute;
