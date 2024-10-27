import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import usersRoutes from "./routes/users.routes.js";


import connectToMongoDB from "./database/connectToMongoDB.js";


const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

app.use(express.json()) // to parse the incoming request with JSON payloads (from req.body)
app.use(cookieParser())

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/users", usersRoutes);

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server is listening at http://localhost:${PORT}/`);
});
