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

    static async addCourses({semId, courses})
    {
        const query = `INSERT INTO courses
                        (sem_id, course_name, course_credits)
                        VALUES (?, ?, ?)`;
        const params = [semId, courseName, courseCredits];
        const promises = courses.map(course => 
            mydb.query(query,[semId,course.courseName,course.courseCredits])
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

    static async addSchedule(semId, courseMap)
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

        rows && rows.length>0 && await mydb.query(query,[rows]);
    }

    static getDatesBetween(fromDate, toDate)
    {
        const dates = [];
        let currentDate = new Date(fromDate);
        const endDate = new Date (toDate);

        while (currentDate <= endDate) {
            
            const formattedDate = currentDate.toISOString().split('T')[0];
            dates.push(formattedDate);
            
            currentDate.setDate(currentDate.getDate() + 1);
        }
    
        return dates;
    }

    static async addCalendar(semId,list,code)
    {
        const query = `INSERT INTO calendar (sem_id, event_date, code, description)
                        VALUES ?`;
        const rows = [];
        list.forEach(element =>{
            const dates = Semester.getDatesBetween(element.from, element.to);
            dates.forEach(date=>{
                rows.push([semId, date, code, element.description]);
            })
        });
        rows && rows.length>0 && await mydb.query(query,[rows]); 

    }

}

export default Semester