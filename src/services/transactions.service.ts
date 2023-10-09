import { RowDataPacket, ResultSetHeader } from "mysql2";
import { nanoid } from "nanoid/async";

import db from "../config/db.js";
import {
    InfoTransact,
    TimeTransact,
    InfoUpdateTransact,
} from "../types/services/transactions.js";
import { formatDay } from "../utils/index.js";
import { convertColumnValueMysql } from "../helpers/mysql.js";

export const getTransactByMonth = async (
    time: TimeTransact,
    userId: string
) => {
    const [data] = await db.execute<RowDataPacket[]>(
        "SELECT * FROM transactions WHERE YEAR(time) = ? AND MONTH(time) = ? AND userId = ?;",
        [time.year, time.month, userId]
    );

    const results = data.map((item) => ({
        ...item,
        time: formatDay(item.time),
    }));

    return results;
};

export const createTransact = async (
    infoTransact: InfoTransact,
    userId: string
) => {
    const transactId = await nanoid(10);
    const { time, wallet, note, price, category } = infoTransact;

    const data = await db.execute<ResultSetHeader>(
        `INSERT INTO transactions (id, time, wallet, note, price, category, userId) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [transactId, time, wallet, note, price, category, userId]
    );

    return data;
};

export const updateTransactById = async (
    transactId: String,
    userId: string,
    infoUpdate: InfoUpdateTransact
) => {
    const { values, columns } = convertColumnValueMysql(infoUpdate);

    const data = await db.execute<ResultSetHeader>(
        `UPDATE transactions SET ${columns} WHERE id =? AND userId =?`,
        [...values, transactId, userId]
    );

    return data;
};

export const deleteTransactById = async (
    transactId: String,
    userId: string
) => {
    const data = await db.execute<ResultSetHeader>(
        "DELETE FROM transactions WHERE id = ? AND userId = ?",
        [transactId, userId]
    );

    return data;
};
