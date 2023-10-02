import httpStatusCode from "../utils/httpStatusCode.js";

const { StatusCode, ReasonPhrases } = httpStatusCode;

class ErrorResponse extends Error {
    status: number;

    constructor(message: string, status: number) {
        super(message);
        this.status = status;
    }
}

class BadRequestError extends ErrorResponse {
    constructor(
        message = ReasonPhrases.BAD_REQUEST,
        statusCode = StatusCode.BAD_REQUEST
    ) {
        super(message, statusCode);
    }
}

class ConflictRequestError extends ErrorResponse {
    constructor(
        message = ReasonPhrases.CONFLICT,
        statusCode = StatusCode.CONFLICT
    ) {
        super(message, statusCode);
    }
}

class AuthFailureError extends ErrorResponse {
    constructor(
        message = ReasonPhrases.UNAUTHORIZED,
        statusCode = StatusCode.UNAUTHORIZED
    ) {
        super(message, statusCode);
    }
}

class InternalServerError extends ErrorResponse {
    constructor(
        message = ReasonPhrases.INTERNAL_SERVER_ERROR,
        statusCode = StatusCode.INTERNAL_SERVER_ERROR
    ) {
        super(message, statusCode);
    }
}

export {
    BadRequestError,
    ConflictRequestError,
    AuthFailureError,
    InternalServerError,
};
