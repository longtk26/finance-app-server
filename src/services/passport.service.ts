import passport from "passport";

import db from "../config/db";
import { findUserByEmail } from "./users.service";

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
                findUserByEmail(profile._json.email)
                    .then((user) => {
                        if (!user) {
                            db.execute(
                                "INSERT INTO users (email, federated) VALUES (?, ?)",
                                [profile._json.email, profile.provider]
                            )
                                .then(() => {
                                    console.log(
                                        "Successfully added google profile!"
                                    );
                                })
                                .catch((err) => console.log(err));
                        } else if (!user.federated) {
                            db.execute(
                                "UPDATE users SET federated = ? WHERE id = ?",
                                [profile.provider, user.id]
                            )
                                .then(() => {
                                    console.log(
                                        "Successfully updated google profile!"
                                    );
                                })
                                .catch((err) => console.log(err));
                        }
                    })
                    .catch((err) => console.log(err));

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
