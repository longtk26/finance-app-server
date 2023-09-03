import { RowDataPacket } from "mysql2";
import db from "../config/db.js";
import { InfoUpdate } from "../types/index.js";
import { nanoid } from "nanoid/async";

export const findUserByEmail = async (email: string) => {
    try {
        const [data] = await db.execute<RowDataPacket[]>(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );

        return data[0];
    } catch (error) {
        console.log(error);
        throw new Error("Error when finding user by email");
    }
};

export const createUser = async (email: string, password: string) => {
    try {
        const userId = await nanoid(10);

        await db.execute(
            "INSERT INTO users (id, email, password) VALUES (?, ?, ?)",
            [userId, email, password]
        );

        return userId;
    } catch (error) {
        console.log(error);
        throw new Error("Error when create user!");
    }
};

export const updateUser = async (email: string, infoUpdate: InfoUpdate) => {
    try {
        let columns = "";
        let values: string[] = [];

        for (const key in infoUpdate) {
            columns += key + "=?, ";
            values.push(infoUpdate[key]);
        }
        // Remove the comma at the end
        columns = columns.slice(0, -2);

        await db.execute(`UPDATE users SET ${columns} WHERE email = ?`, [
            ...values,
            email,
        ]);
    } catch (error) {
        console.log(error);
        throw new Error("Error when update user!");
    }
};
