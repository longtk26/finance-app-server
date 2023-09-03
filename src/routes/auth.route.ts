import { Router } from "express";
import passport from "passport";
import { configPassPort } from "../services/passport.service.js";
import { CLIENT_URL } from "../constants/index.js";
import { login, loginSuccess, register } from "../handlers/auth.js";
import { protect } from "../middleware/protect.js";

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

authRoute.get("/login/failure", (_, res) => {
    res.json({
        success: false,
        message: "Failed to login by Oauth",
    });
});

// Auth in app

authRoute.get("/login/success", protect, loginSuccess);

authRoute.post("/login", login);

authRoute.post("/register", register);

export default authRoute;
