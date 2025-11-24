import express from "express";
import { nanoid } from "nanoid"
import dotenv from "dotenv"
import connectDB from "./src/config/monogo.config.js"
import short_url from "./src/routes/short_url.route.js"
import user_routes from "./src/routes/user.routes.js"
import auth_routes from "./src/routes/auth.routes.js"
import { redirectFromShortUrl } from "./src/controller/short_url.controller.js";
import { errorHandler } from "./src/utils/errorHandler.js";
import cors from "cors"
import { attachUser } from "./src/utils/attachUser.js";
import cookieParser from "cookie-parser"

dotenv.config("./.env")

const app = express();

const allowedOrigins = new Set([
    'http://localhost:5174',
    'http://127.0.0.1:5174',
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    process.env.FRONTEND_URL // Add production frontend URL
]);

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true); // non-browser or same-origin
        if (allowedOrigins.has(origin)) return callback(null, true);
        return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(attachUser)

app.use("/api/user", user_routes)
app.use("/api/auth", auth_routes)
app.use("/api/create", short_url)
app.get("/:id", redirectFromShortUrl)

app.use(errorHandler)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    connectDB()
    console.log(`Server is running on port ${PORT}`);
})

// GET - Redirection
//mongodb+srv://agrajsingh0511_db_user:CZCeuQNUsixTWYjA@cluster0.yuunwaz.mongodb.net/?appName=Cluster0
