import express from "express"
import cors from "cors"
import userRoutes from "./routes/userRoutes.js"
import semesterRoutes from "./routes/semesterRoutes.js"
import attendanceRoutes from "./routes/attendanceRoutes.js"
const app = express();

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization','x-sem-id']
};

app.use(cors(corsOptions));

app.use('/',express.json());
app.use('/api/users',userRoutes);
app.use('/api/semesters',semesterRoutes);
app.use('/api/attendance',attendanceRoutes);
app.listen(3000);