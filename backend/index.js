import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.routes.js"
import companyRoute from "./routes/company.route.js"
import jobRoute from "./routes/job.route.js"
import applicationRoute from "./routes/application.route.js"
import path from "path"

dotenv.config({})       //  Loads environment variables from a .env file in the project’s root directory.

const app = express();

const _dirname= path.resolve();

// app.get("/", (req, res) => {
//     return res.status(200).json({
//         message: "Welcome to the home page",
//         developer: "Madhur Gupta",
//         success: true
//     })
// })

// Adding Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corOptions = {
    origin: 'http://localhost:5173',
    credentials: true
}
app.use(cors(corOptions));



const PORT = process.env.PORT || 3000;

// API's
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

app.use(express.static(path.join(_dirname, "/frontend/dist")));
app.get('*', (req, res)=> {
    res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"))
})

// app.use((req, res, next) => {
//     res.status(404).json({
//         message: "API endpoint not found",
//         success: false
//     });
// });

// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).json({
//         message: "Something went wrong on the server",
//         success: false
//     });
// });

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, async () => {
            console.log(`The server is running at port: ${PORT}`);

        })
    } catch (error) {
        console.error('Failed to connect to the database:', error);
        process.exit(1); // Exit the process if the DB connection fails
    }
};
startServer();


// MiddleWare Information
// 1. express.json() - This middleware parses incoming requests with JSON payloads and makes the data available in req.body.

// 2. UrlEncoded
// Purpose: This middleware parses incoming requests with URL-encoded payloads (usually from HTML forms) and makes the data available in req.body.
// Extended Option:
//     extended: true: Allows parsing of nested objects (e.g., person[name]=John).
//     extended: false: Only allows parsing of simple key-value pairs.
// When to Use: Use this when your application needs to handle form submissions or data encoded in URLs.

// 3. Cookie Parser: This middleware parses the Cookie header from the incoming request and populates req.cookies with an object keyed by cookie names.

// 4. Cors Options
// Purpose: This line applies the CORS (Cross-Origin Resource Sharing) middleware with the specified options (corOptions).
// When to Use: Use this when your server needs to handle requests from a different origin, such as when your frontend is served from a different domain or port than your backend. CORS allows the server to specify which origins are permitted to access its resources.
// Example:
// If your frontend is running on http://localhost:5173 and your backend on http://localhost:3000, CORS ensures that requests made from the frontend to the backend are allowed, considering the same-origin policy enforced by browsers.
