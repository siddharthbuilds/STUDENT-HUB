import express from "express"
import userRoutes from "./routes/userRoutes.js"
import semesterRoutes from "./routes/semesterRoutes.js"
import attendanceRoutes from "./routes/attendanceRoutes.js"
const app = express();

app.use('/',express.json());
app.use('/api/users',userRoutes);
app.use('/api/semesters',semesterRoutes);
app.use('/api/attendance',attendanceRoutes);
app.listen(3000);