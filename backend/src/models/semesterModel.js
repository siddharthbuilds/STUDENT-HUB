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

    static async getSemesters({userId})
    {
        const query = `SELECT sem_name AS semName, 
                        start_date AS startDate, end_date AS endDate, 
                        sem_id AS semId
                        FROM semesters WHERE user_id=?`;
        const [semesters] = await mydb.query(query,[userId]);
        return semesters;
    }

    static async getCurrentSemester({userId})
    {
        const query = `SELECT sem_id AS semId FROM semesters 
                        WHERE user_id=? AND 
                        CURDATE() BETWEEN start_date AND end_date`;
        const [currentSemester] = await mydb.query(query,[userId]);
        if(currentSemester.length==0)
        {
            const requery = `SELECT sem_id AS semId FROM semesters 
                            WHERE user_id=?`;
            const [currentSem] = await mydb.query(requery,[userId]);
            return currentSem[0];
        }
        return currentSemester[0];
    }

    static async checkAttendanceDate({semId, attendanceDate})
    {
        const query = `SELECT CASE WHEN ? BETWEEN start_date AND end_date THEN 1 
                        ELSE 0 END AS is_between FROM semesters WHERE sem_id=?`;
        //attendanceDate=String(attendanceDate);
        const [response] = await mydb.query(query,[attendanceDate,semId]);
        return response[0].is_between;
    }
}

export default Semester