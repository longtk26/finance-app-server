import { Router } from "express";
import passport from "passport";

import { configPassPort } from "../services/passport.service.js";
import { CLIENT_URL } from "../constants/index.js";
import {
    login,
    loginSuccess,
    logoutPassport,
    register,
} from "../handlers/auth.js";
import { protect } from "../middleware/protect.js";
import asyncHandler from "../helpers/asyncHandler.js";
import { validateInput } from "../validator/auth.validate.js";
import { AuthFailureError } from "../core/error.response.js";

const authRoute = Router();

// Config
configPassPort();

// Oauth facebook
authRoute.get("/facebook", passport.authenticate("facebook"));
authRoute.get(
    "/facebook/callback",
    passport.authenticate("facebook", {
        successRedirect: CLIENT_URL,
        failureRedirect: "login/failure",
    })
);

// Oauth google
authRoute.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);
authRoute.get(
    "/google/callback",
    passport.authenticate("google", {
        successRedirect: CLIENT_URL,
        failureRedirect: "login/failure",
    })
);

authRoute.post("/login/success", protect, loginSuccess);

authRoute.get("/login/failure", (_, res) => {
    throw new AuthFailureError("Login failed by Oauth google");
});
authRoute.post("/logout-passport", protect, logoutPassport);

// Auth in app

authRoute.post("/login", validateInput(), asyncHandler(login));

authRoute.post("/register", validateInput(), asyncHandler(register));

export default authRoute;
