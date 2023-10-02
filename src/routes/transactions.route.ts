import { Router } from "express";
import {
    getTransacts,
    newTransact,
    updateTransact,
    deleteTransact,
} from "../handlers/transactions.js";
import { validate } from "../validator/index.js";
import { body, checkExact, param } from "express-validator";
import asyncHandler from "../helpers/asyncHandler.js";

const transacRoute = Router();

transacRoute.get(
    "/:userId",
    validate([
        param("userId").custom((val, { req }) => val === req.user.id),
        body("time").notEmpty().isString(),
        checkExact(),
    ]),
    asyncHandler(getTransacts)
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
    asyncHandler(newTransact)
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
    asyncHandler(updateTransact)
);

transacRoute.delete(
    "/:userId/:id",
    validate([
        param("userId").custom((val, { req }) => val === req.user.id),
        param("id").notEmpty(),
        checkExact([param("id").notEmpty()]),
    ]),
    asyncHandler(deleteTransact)
);

export default transacRoute;
