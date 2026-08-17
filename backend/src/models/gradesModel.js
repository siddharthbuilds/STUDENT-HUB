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
}

export default Grade;