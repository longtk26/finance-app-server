import { Router } from "express";
import {
    getTransacts,
    newTransact,
    updateTransact,
    deleteTransact,
} from "../handlers/transactions.js";
import asyncHandler from "../helpers/asyncHandler.js";
import {
    validateDeleteInput,
    validateGetInput,
    validatePatchInput,
    validatePostInput,
} from "../validator/transact.validate.js";

const transacRoute = Router();

transacRoute.get("/:userId", validateGetInput(), asyncHandler(getTransacts));

transacRoute.post(
    "/:userId/new",
    validatePostInput(),
    asyncHandler(newTransact)
);

transacRoute.patch(
    "/:userId/:id",
    validatePatchInput(),
    asyncHandler(updateTransact)
);

transacRoute.delete(
    "/:userId/:id",
    validateDeleteInput(),
    asyncHandler(deleteTransact)
);

export default transacRoute;
