import express, { NextFunction, Request, Response } from "express";
import "dotenv/config";
import rootRoute from "./routes/index.js";
import passport from "passport";
import cors from "cors";
import morgan from "morgan";
import session from "express-session";
import helmet from "helmet";
import compression from "compression";

const app = express();
const PORT = process.env.PORT || 8081;

// General configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(compression());
app.use(morgan("dev"));
app.use(
    cors({
        origin: "http://localhost:3000",
        methods: "GET, POST, PUT, DELETE",
        credentials: true,
    })
);
app.use(
    session({
        secret: process.env.SESSION_SECRET_KEY!,
        saveUninitialized: false,
        resave: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24,
        },
    })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// init routers
app.use("/v1/api", rootRoute);

// Handle Error

app.use((req, res, next) => {
    const error = new Error("Resource not found!") as any;
    error.status = 404;
    next(error);
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = error.status || 500;

    return res.status(statusCode).json({
        status: "Error",
        code: statusCode,
        message: error.message || "Internal Server Error",
    });
});

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
