import { Router } from "express";
import {
    getTransacts,
    newTransact,
    updateTransact,
    deleteTransact,
    searchTransact,
} from "../handlers/transactions.js";
import asyncHandler from "../helpers/asyncHandler.js";
import {
    validateDeleteInput,
    validateGetInput,
    validatePatchInput,
    validatePostInput,
    validateSearchInput,
} from "../validator/transact.validate.js";

const transacRoute = Router();

transacRoute.get("/", validateGetInput(), asyncHandler(getTransacts));

transacRoute.post("/new", validatePostInput(), asyncHandler(newTransact));

transacRoute.post(
    "/search",
    validateSearchInput(),
    asyncHandler(searchTransact)
);

transacRoute.patch("/:id", validatePatchInput(), asyncHandler(updateTransact));

transacRoute.delete(
    "/:id",
    validateDeleteInput(),
    asyncHandler(deleteTransact)
);

export default transacRoute;
