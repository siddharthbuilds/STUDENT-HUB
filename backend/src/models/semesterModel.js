import mydb from "../config/database.js";

class Semester{
    static async addSemester({semName,startDate,endDate,userId})
    {
        const query = `INSERT INTO semesters
                        (user_id, sem_name, start_date, end_date)
                        VALUES (?, ?, ?, ?)`;
        const params = [userId, semName, startDate, endDate];
        const [result] = await mydb.query(query, params);
        return result.insertId;
    }

    static async addCourses({semId, courseName, courseCredits})
    {
        const query = `INSERT INTO courses
                        (sem_id, course_name, course_credits)
                        VALUES (?, ?, ?)`;
        const params = [semId, courseName, courseCredits];
    }

}

export default Semester