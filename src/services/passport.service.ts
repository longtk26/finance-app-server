import passport from "passport";

const GoogleStrategy = require("passport-google-oauth20").Strategy;

export const configPassPort = () => {
    // passport.use(
    //     new Facebook(
    //         {
    //             clientID: process.env.FACEBOOK_APP_ID,
    //             clientSecret: process.env.FACEBOOK_APP_SECRET,
    //             callbackURL: "/api/auth/facebook/callback",
    //         },
    //         function (accessToken, refreshToken, profile, cb) {
    //             cb(null, profile);
    //         }
    //     )
    // );

    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: "/api/auth/google/callback",
            },
            function (accessToken, refreshToken, profile, cb) {
                cb(null, profile);
            }
        )
    );

    passport.serializeUser((user, cb) => {
        cb(null, user);
    });

    passport.deserializeUser((user, cb) => {
        cb(null, user!);
    });
};
