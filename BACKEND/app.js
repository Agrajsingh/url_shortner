// import express from "express";
// import { nanoid } from "nanoid"
// import dotenv from "dotenv"
// import connectDB from "./src/config/monogo.config.js"
// import short_url from "./src/routes/short_url.route.js"
// import user_routes from "./src/routes/user.routes.js"
// import auth_routes from "./src/routes/auth.routes.js"
// import { redirectFromShortUrl } from "./src/controller/short_url.controller.js";
// import { errorHandler } from "./src/utils/errorHandler.js";
// import cors from "cors"
// import { attachUser } from "./src/utils/attachUser.js";
// import cookieParser from "cookie-parser"

// dotenv.config("./.env")

// const app = express();

// // Normalize allowed origins and log incoming origin for easier debugging.
// const allowedOrigins = new Set([
//     'http://localhost:5174',
//     'http://127.0.0.1:5174',
//     'http://localhost:5173',
//     'http://127.0.0.1:5173'
// ]);

// // Add FRONTEND_URL from env if present (trim trailing slash)
// const rawFrontendUrl = (process.env.FRONTEND_URL || '').trim();
// const frontendUrl = rawFrontendUrl ? rawFrontendUrl.replace(/\/+$/, '') : '';
// if (frontendUrl) allowedOrigins.add(frontendUrl);

// app.use(cors({
//     origin: (origin, callback) => {
//         // Log origin for debugging CORS issues (appears in server logs)
//         console.log('CORS origin:', origin);

//         if (!origin) return callback(null, true); // non-browser or same-origin requests

//         const normalized = origin.replace(/\/+$/, '');

//         // Allow exact matches or any onrender.com subdomain (convenience for Render)
//         if (allowedOrigins.has(normalized) || /\.onrender\.com$/.test(normalized)) {
//             return callback(null, true);
//         }

//         return callback(new Error('Not allowed by CORS'));
//     },
//     credentials: true,
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization']
// }));

// app.options('*', cors());


// app.use(express.json())
// app.use(express.urlencoded({ extended: true }))
// app.use(cookieParser())

// app.use(attachUser)

// app.use("/api/user", user_routes)
// app.use("/api/auth", auth_routes)
// app.use("/api/create", short_url)
// app.get("/:id", redirectFromShortUrl)

// app.use(errorHandler)

// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//     connectDB()
//     console.log(`Server is running on port ${PORT}`);
// })


// // GET - Redirection
// CORS middleware
app.use(cors({
    origin: (origin, callback) => {
        console.log("CORS origin:", origin);

        if (!origin) return callback(null, true);

        const normalized = origin.replace(/\/+$/, '');

        if (allowedOrigins.has(normalized) || /\.onrender\.com$/.test(normalized)) {
            return callback(null, true);
        }

        return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

// 🚀 MUST BE HERE — exactly after CORS middleware
app.options("*", cors());

// other middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(attachUser);

// routes
app.use("/api/user", user_routes);
app.use("/api/auth", auth_routes);
app.use("/api/create", short_url);

// MUST BE LAST ROUTE   
app.get("/:id", redirectFromShortUrl);

// error handler
app.use(errorHandler);
