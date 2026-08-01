import mydb from "../config/database.js";
class Semester{
    static async addSemester({connection,semName,startDate,endDate,userId})
    {
        const query = `INSERT INTO semesters
                        (user_id, sem_name, start_date, end_date)
                        VALUES (?, ?, ?, ?)`;
        const params = [userId, semName, startDate, endDate];
        const [result] = await connection.query(query, params);
        return result.insertId;
    }
}

export default Semester