import mydb from "../config/database.js";
class Schedule
{
    static async addSchedule({connection,semId, courseMap})
    {
        const query =  `INSERT INTO schedules (sem_id, course_id, day, hour)
                        VALUES ?`;
        const dayMap = {
            mon: 1,
            tue: 2,
            wed: 3,
            thu: 4,
            fri: 5
        };

        const dayHourCounter = {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0
        };

        const rows = [];

        for (const { courseId, course } of Object.values(courseMap))
        {
            for(const [dayName, dayNumber] of Object.entries(dayMap))
            {
                if(course[dayName] === 0) {continue;}
                const multiplier = parseInt(course[dayName].split(' ')[1]);
                for(let i=1;i<=multiplier;i++)
                {
                    rows.push([semId, courseId, dayNumber, ++dayHourCounter[dayNumber]]);
                }
                
            }
        }

        rows && rows.length>0 && await connection.query(query,[rows]);
    }
}
export default Schedule;