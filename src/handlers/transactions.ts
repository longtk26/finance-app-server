import { Response } from "express";
import {
    createTransact,
    getTransactByMonth,
    deleteTransactById,
    updateTransactById,
    searchTransactByTime,
} from "../services/transactions.service.js";
import { CREATED, SuccessResponse } from "../core/success.response.js";
import { InternalServerError } from "../core/error.response.js";

export const getTransacts = async (req, res: Response) => {
    const userId = req.user.id;
    const [month, year] = req.body.time.split("/");
    const transacts = await getTransactByMonth({ year, month }, userId);

    if (transacts.length === 0)
        new SuccessResponse({ message: "No transactions found!" }).send(res);

    new SuccessResponse({ metadata: transacts }).send(res);
};

export const newTransact = async (req, res: Response) => {
    const userId = req.user.id;
    const infoTransact = req.body;

    const data = await createTransact(infoTransact, userId);

    if (!data) throw new InternalServerError("Error creating transaction!");

    new CREATED({
        message: "Created transaction!",
        metadata: data,
    }).send(res);
};

export const updateTransact = async (req, res: Response) => {
    const userId = req.user.id;
    const transactId = req.params.id;
    const infoTransact = req.body;

    const data = await updateTransactById(transactId, userId, infoTransact);

    if (!data) throw new InternalServerError("Error updating transaction!");

    new SuccessResponse({ message: "Updated transaction!" }).send(res);
};

export const deleteTransact = async (req, res: Response) => {
    const userId = req.user.id;
    const transactId = req.params.id;
    const data = await deleteTransactById(transactId, userId);

    if (!data) throw new InternalServerError("Error deleting transaction!");

    new SuccessResponse({ message: "Deleted transaction!" }).send(res);
};

export const searchTransact = async (req, res: Response) => {
    const userId = req.user.id;
    const { timeStart, timeEnd } = req.body;

    const data = await searchTransactByTime(timeStart, timeEnd, userId);

    if (!data) throw new InternalServerError("Error searching transaction!");

    new SuccessResponse({
        metadata: data,
    }).send(res);
};
