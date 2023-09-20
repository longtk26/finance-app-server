import { RowDataPacket } from "mysql2";
import db from "../config/db.js";

export const getAllCategories = async () => {
    try {
        const data = await db.execute<RowDataPacket[]>(
            "SELECT * FROM categories"
        );

        // Return data[0] to get neccessary data
        return data[0];
    } catch (error) {
        console.log(error);
        throw new Error("Internal error");
    }
};
