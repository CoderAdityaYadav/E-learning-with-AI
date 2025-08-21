import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js';
import authRoutes from "./routes/authRoutes.js"
import courseRoutes from "./routes/courseRoutes.js"

dotenv.config(); // use to access env
connectDB();     // db connection

const app = express()
const PORT = process.env.PORT || 5000

// Middlewares
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on Port http://localhost:${PORT}`)
}) 