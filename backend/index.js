import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import cloudinary from "cloudinary";
import path from "path";
// importing routes
import userRoutes from "./routes/user.route.js";
import pinRoutes from "./routes/pin.route.js";

dotenv.config();
cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})
const app = express();
const port = process.env.PORT;

// using middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: "*", // Replace with your frontend URL
        credentials: true, // Allow cookies to be sent
    })
);

// using routes
app.use("/api/user", userRoutes);
app.use("/api/pin", pinRoutes);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/frontend/dist/index.html"));
})

// server listening
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
    connectDB();
});