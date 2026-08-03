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

    static async deleteSemester({userId,semId})
    {
        const query = `DELETE FROM semesters
                        WHERE sem_id = ?
                        AND user_id = ?;` ;
        const params = [semId, userId];
        const [result] = await mydb.query(query,params);
        return result;
    }
}

export default Semester