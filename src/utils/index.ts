import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const generateToken = (user: { id: string; email: string }) => {
    try {
        const token = jwt.sign(user, process.env.SECRET_JWT!, {
            expiresIn: "1h",
        });

        return token;
    } catch (error) {
        throw new Error("Error when generating token!");
    }
};

export const hashPassword = async (pass: string) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(pass, salt);

        return hash;
    } catch (error) {
        throw new Error("Error hashing password!");
    }
};

export const comparePassword = async (pass: string, hash: string) => {
    try {
        const result = await bcrypt.compare(pass, hash);

        return result;
    } catch (error) {
        throw new Error("Error compare password!");
    }
};

export const formatDay = (time: string, option: string): string => {
    const date = new Date(time);
    const month =
        date.getMonth() + 1 < 10
            ? `0${date.getMonth() + 1}`
            : date.getMonth() + 1;

    const [day, monthTime, year] = time.split ? time.split("/") : ["", "", ""];

    const optionsFormat = {
        client: `${date.getDate()}/${month}/${date.getFullYear()}`,
        server: `${year}/${monthTime}/${day}`,
    };

    return optionsFormat[option];
};
