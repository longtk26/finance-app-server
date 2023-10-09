import { body, checkExact, param } from "express-validator";
import { validate } from "./index.js";

export const validateGetInput = () =>
    validate([
        param("userId").custom((val, { req }) => val === req.user.id),
        body("time").notEmpty().isString(),
        checkExact(),
    ]);

export const validatePostInput = () =>
    validate([
        param("userId").custom((val, { req }) => val === req.user.id),
        body("time").notEmpty().isString(),
        body("wallet").notEmpty().isString(),
        body("note").isString(),
        body("price").notEmpty().isInt(),
        body("category").notEmpty().isString(),
        checkExact(),
    ]);

export const validatePatchInput = () =>
    validate([
        param("userId").custom((val, { req }) => val === req.user.id),
        body("time").optional().isString(),
        body("wallet").optional().isString(),
        body("note").optional().isString(),
        body("price").optional().isInt(),
        body("category").optional().isString(),
        checkExact([param("id").notEmpty()]),
    ]);

export const validateDeleteInput = () =>
    validate([
        param("userId").custom((val, { req }) => val === req.user.id),
        checkExact([param("id").notEmpty()]),
    ]);
