import { RowDataPacket, ResultSetHeader } from "mysql2";
import { nanoid } from "nanoid/async";

import db from "../config/db.js";
import {
    InfoTransact,
    TimeTransact,
    InfoUpdateTransact,
} from "../types/index.js";
import { convertColumnValueMysql, formatDay } from "../utils/index.js";

export const getTransactByMonth = async (
    time: TimeTransact,
    userId: string
) => {
    try {
        const [data] = await db.execute<RowDataPacket[]>(
            "SELECT * FROM transactions WHERE YEAR(time) = ? AND MONTH(time) = ? AND userId = ?;",
            [time.year, time.month, userId]
        );

        const results = data.map((item) => ({
            ...item,
            time: formatDay(item.time),
        }));

        return results;
    } catch (error) {
        console.log(error);
        return [];
    }
};

export const createTransact = async (
    infoTransact: InfoTransact,
    userId: string
) => {
    try {
        const transactId = await nanoid(10);
        const { time, wallet, note, price, category } = infoTransact;

        const data = await db.execute<ResultSetHeader>(
            `INSERT INTO transactions (id, time, wallet, note, price, category, userId) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [transactId, time, wallet, note, price, category, userId]
        );

        return data;
    } catch (error) {
        console.log(error);
    }
};

export const updateTransactById = async (
    transactId: String,
    userId: string,
    infoUpdate: InfoUpdateTransact
) => {
    try {
        const { values, columns } = convertColumnValueMysql(infoUpdate);

        const data = await db.execute<ResultSetHeader>(
            `UPDATE transactions SET ${columns} WHERE id =? AND userId =?`,
            [...values, transactId, userId]
        );

        return data;
    } catch (error) {
        console.log(error);
    }
};

export const deleteTransactById = async (
    transactId: String,
    userId: string
) => {
    try {
        const data = await db.execute<ResultSetHeader>(
            "DELETE FROM transactions WHERE id = ? AND userId = ?",
            [transactId, userId]
        );

        return data;
    } catch (error) {
        console.log(error);
    }
};
