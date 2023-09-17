import { Response } from "express";
import {
    createTransact,
    getTransactByMonth,
    deleteTransactById,
    updateTransactById,
} from "../services/transactions.service.js";

/**
 * Default getTransactByMonth
 */

export const getTransacts = async (req, res: Response) => {
    const userId = req.params.userId;
    const [month, year] = req.body.time.split("/");
    const transacts = await getTransactByMonth({ year, month }, userId);

    if (transacts.length === 0) {
        res.status(404);
        res.json({ message: "No transacts found" });
    } else {
        res.status(200);
        res.json(transacts);
    }
};

export const newTransact = async (req, res: Response) => {
    const userId = req.params.userId;
    const infoTransact = req.body;

    const data = await createTransact(infoTransact, userId);

    if (data) {
        res.status(201);
        res.json({ message: "Created transaction!" });
    } else {
        res.status(500);
        res.json({ message: "Error creating transaction!" });
    }
};

export const updateTransact = async (req, res: Response) => {
    const userId = req.params.userId;
    const transactId = req.params.id;
    const infoTransact = req.body;

    const data = await updateTransactById(transactId, userId, infoTransact);

    if (data) {
        res.status(201);
        res.json({ message: "Updated transaction!" });
    } else {
        res.status(500);
        res.json({ message: "Error updating transaction!" });
    }
};

export const deleteTransact = async (req, res: Response) => {
    const userId = req.params.userId;
    const transactId = req.params.id;
    const data = await deleteTransactById(transactId, userId);

    if (data) {
        res.status(201);
        res.json({ message: "Deleted transaction!" });
    } else {
        res.status(500);
        res.json({ message: "Error deleting transaction!" });
    }
};
