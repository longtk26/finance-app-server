import { body } from "express-validator";
import { validate } from "./index.js";

export const validateInput = () =>
    validate([body("email").isEmail(), body("password").isLength({ min: 6 })]);
