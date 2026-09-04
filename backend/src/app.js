import express from "express"
import cors from "cors"
import userRoutes from "./routes/userRoutes.js"
import semesterRoutes from "./routes/semesterRoutes.js"
import attendanceRoutes from "./routes/attendanceRoutes.js"
import gradeRoutes from "./routes/gradeRoutes.js"
import dotenv from "dotenv"

dotenv.config();
const app = express();

const corsOptions = {
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization','x-sem-id']
};

app.use(cors(corsOptions));

app.use('/',express.json());
app.use('/api/users',userRoutes);
app.use('/api/semesters',semesterRoutes);
app.use('/api/attendance',attendanceRoutes);
app.use('/api/grades',gradeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});