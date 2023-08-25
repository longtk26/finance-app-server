import { Router } from "express";
import passport from "passport";
import { configPassPort } from "../services/passport.service";
import { CLIENT_URL } from "../constants";
import { login, loginSuccess, register } from "../handlers/auth";

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

// Auth in app

authRoute.get("/login/success", loginSuccess);

authRoute.get("/login/failure", (req, res) => {
    res.json({
        success: false,
        message: "Failed to login by Oauth",
    });
});

authRoute.post("/login", login);

authRoute.post("/register", register);

export default authRoute;
