import mydb from "../config/database.js";
class Course
{
    static async addCourses({connection,semId, courses})
    {
        const query = `INSERT INTO courses
                        (sem_id, course_name, course_credits)
                        VALUES (?, ?, ?)`;
        const params = [semId, courses.courseName, courses.courseCredits];
        const promises = courses.map(course => 
            connection.query(query,[semId,course.courseName,course.courseCredits])
        );
        const result = await Promise.all(promises);

        const courseMap = {};
        courses.forEach((course, index) => {
            courseMap[course.courseName] = {courseId: result[index][0].insertId,
                course
            };
        });

        return courseMap;
    }

    static async semCourses({semId})
    {
        const query = `SELECT course_name AS courseName, 
                        course_credits AS courseCredits
                        FROM courses
                        WHERE sem_id=?`;
        const [courses] = await mydb.query(query,[semId]);
        return courses;
    }
}

export default Course;