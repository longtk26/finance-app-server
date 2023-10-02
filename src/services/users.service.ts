import { RowDataPacket } from "mysql2";
import db from "../config/db.js";
import { nanoid } from "nanoid/async";
import { convertColumnValueMysql } from "../utils/index.js";
import { InfoUpdateUser } from "../types/services/users.js";

export const findUserByEmail = async (email: string) => {
    const [data] = await db.execute<RowDataPacket[]>(
        "SELECT * FROM users WHERE email = ?",
        [email]
    );

    return data[0];
};

export const createUser = async (email: string, password: string) => {
    const userId = await nanoid(10);

    await db.execute(
        "INSERT INTO users (id, email, password) VALUES (?, ?, ?)",
        [userId, email, password]
    );

    return userId;
};

export const updateUser = async (email: string, infoUpdate: InfoUpdateUser) => {
    const { values, columns } = convertColumnValueMysql(infoUpdate);

    await db.execute(`UPDATE users SET ${columns} WHERE email = ?`, [
        ...values,
        email,
    ]);
};
