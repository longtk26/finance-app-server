import express from "express";
import "dotenv/config";
import rootRoute from "./routes";
import passport from "passport";
import cors from "cors";
import morgan from "morgan";
import session from "express-session";

const app = express();
const PORT = process.env.PORT || 8081;

// General configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
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

// Root route
app.use("/api", rootRoute);

// Hello API
app.get("/", (req, res) => {
    res.json({ message: "Welcome to finance API!" });
});

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
