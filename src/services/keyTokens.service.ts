import { ResultSetHeader, RowDataPacket } from "mysql2";
import db from "../config/db.js";

export const findKeyTokenByUserId = async (userId: string) => {
    const keyToken = await db.execute<RowDataPacket[]>(
        "SELECT token FROM keyTokens WHERE userId =?",
        [userId]
    );

    return keyToken[0][0];
};

export const createKeyToken = async (key: string, userId: string) => {
    const data = await db.execute<ResultSetHeader>(
        "INSERT INTO keyTokens (token, userId) VALUES (?, ?)",
        [key, userId]
    );

    return data;
};

export const deleteKeyToken = async (key: string) => {
    const data = await db.execute<ResultSetHeader>(
        "DELETE FROM keyTokens WHERE token = ?",
        [key]
    );

    return data;
};
