import mydb from "../config/database.js";
class Grade{
    static async createGrades({userId, semId, courses,connection})
    {
        const insertData = [];
        courses.forEach(course=>{
            insertData.push([userId,semId,course.courseId,'Y'])
        });
        const query = `INSERT INTO grades (user_id, sem_id, course_id,grade)
                        VALUES ?`;
        insertData && insertData.length>0 && await connection.query(query,[insertData]);
    } 

    static async getGrades({userId})
    {
        const query = `SELECT grade_id AS gradeId, grades.sem_id AS semID,
                        grades.course_id AS courseId, grades.grade, courses.course_credits AS
                        courseCredits, courses.course_name AS courseName, semesters.sem_name AS semName
                        FROM grades 
                        JOIN courses ON grades.course_id=courses.course_id
                        JOIN semesters ON semesters.sem_id=grades.sem_id
                        WHERE grades.user_id=?`;
        const [userGrades] = await mydb.query(query,[userId]);
        return userGrades;
                        
    }
}

export default Grade;