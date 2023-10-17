import passport from "passport";
import { nanoid } from "nanoid";
import crypto from "crypto";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

import db from "../config/db.js";
import { findUserByEmail } from "./users.service.js";
import { SERVER_URL } from "../constants/index.js";
import { createKeyToken } from "./keyTokens.service.js";

export const configPassPort = () => {
    // passport.use(
    //     new Facebook(
    //         {
    //             clientID: process.env.FACEBOOK_APP_ID,
    //             clientSecret: process.env.FACEBOOK_APP_SECRET,
    //             callbackURL: "v1/api/auth/facebook/callback",
    //         },
    //         function (accessToken, refreshToken, profile, cb) {
    //             cb(null, profile);
    //         }
    //     )
    // );

    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID!,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
                callbackURL: `${SERVER_URL}/auth/google/callback`,
            },
            async function (accessToken, refreshToken, profile, cb) {
                const user = await findUserByEmail(profile._json.email!);

                if (!user) {
                    const userId = nanoid(10);

                    await db.execute(
                        "INSERT INTO users (id, email, federated) VALUES (?, ?, ?)",
                        [userId, profile._json.email, profile.provider]
                    );

                    const keyActive = crypto.randomBytes(64).toString("hex");
                    await createKeyToken(keyActive, userId);

                    console.log("Successfully added google profile!");
                } else if (!user.federated) {
                    await db.execute(
                        "UPDATE users SET federated = ? WHERE id = ?",
                        [profile.provider, user.id]
                    );
                    console.log("Successfully updated google profile!");
                }

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
