import { Response } from "express";
import httpStatusCode from "../utils/httpStatusCode.js";
import { CREATEDResponseTypes, OKResponseTypes } from "../types/core/index.js";

const { StatusCode, ReasonPhrases } = httpStatusCode;

class SuccessResponse {
    private status: number;
    private message: string;
    private metadata: object;

    constructor({
        message = "",
        statusCode = StatusCode.OK,
        reasonStatusCode = ReasonPhrases.OK,
        metadata = {},
    }) {
        this.message = message ? message : reasonStatusCode;
        this.status = statusCode;
        this.metadata = metadata;
    }

    public send(res: Response, headers = {}) {
        return res.status(this.status).json(this);
    }
}

class OK extends SuccessResponse {
    constructor({ message, metadata }: OKResponseTypes) {
        super({ message, metadata });
    }
}

class CREATED extends SuccessResponse {
    private options: any;

    constructor({
        message,
        statusCode = StatusCode.CREATED,
        reasonStatusCode = ReasonPhrases.CREATED,
        metadata,
        options,
    }: CREATEDResponseTypes) {
        super({ message, statusCode, reasonStatusCode, metadata });
        this.options = options;
    }
}

export { OK, CREATED, SuccessResponse };
