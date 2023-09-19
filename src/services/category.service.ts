import { RowDataPacket } from "mysql2";
import db from "../config/db.js";

export const getAllCategories = async () => {
    try {
        const data = await db.execute<RowDataPacket[]>(
            "SELECT * FROM categories"
        );
    } catch (error) {
        console.log(error);
    }
};
