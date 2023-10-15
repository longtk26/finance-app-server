import nodemailer from "nodemailer";
import { VerfifyEmailTypes } from "../types/services/email.js";
import { findUserByEmail, updateUser } from "./users.service.js";
import { AuthFailureError } from "../core/error.response.js";
import { deleteKeyToken, findKeyTokenByUserId } from "./keyTokens.service.js";
import { SERVER_URL } from "../constants/index.js";

class EmailService {
    static config = {
        service: "gmail",
        auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.PASS_EMAIL,
        },
    };

    static async sendEmail(email: string, userId: string) {
        const keyActive = await findKeyTokenByUserId(userId);
        if (!keyActive) throw new AuthFailureError("Email is invalid!");

        const transporter = nodemailer.createTransport(EmailService.config);

        const message = {
            from: process.env.USER_EMAIL,
            to: email,
            subject: "VERIFY ACCOUNT FINANCE-APP",
            text: "Hello world?",
            html: `<b>Click to link for activated account.</b>
            <a>${SERVER_URL}/auth/verify-email?email=${email}&token=${keyActive.token}</a>`,
        };

        const info = await transporter.sendMail(message);

        return info;
    }

    static async verifyEmail({ email, token }: VerfifyEmailTypes) {
        const user = await findUserByEmail(email);
        if (!user) throw new AuthFailureError("Email is invalid!");

        const keyToken = await findKeyTokenByUserId(user.id);
        if (!keyToken) throw new AuthFailureError("Email is invalid!");

        if (token !== keyToken.token)
            throw new AuthFailureError("Token is invalid!");

        await updateUser(email, { activated: true });
        await deleteKeyToken(keyToken.token);

        return {
            message: "Your account is already activated!",
        };
    }
}

export default EmailService;
