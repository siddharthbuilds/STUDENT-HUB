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

    static async addSaturdays(semId, saturdays)
    {
        const dayMap = {
            mon: 1,
            tue: 2,
            wed: 3,
            thu: 4,
            fri: 5
        };
        const query = `INSERT INTO calendar (sem_id, event_date, code, description)
                        VALUES ?`;
        const rows = [];
        saturdays.forEach(saturday=>{
            if(saturday.status == 1)
            {
                rows.push([semId,saturday.date,3,dayMap[saturday.order]]);
            }
            else
            {
                rows.push([semId,saturday.date,1,"Saturday"]);
            }
        })
        rows && rows.length>0 && await mydb.query(query,[rows]); 
    }

    static async generateAttendance(semId,fromDate,toDate)
    {
        const calendarQuery = `SELECT calendar_id, event_date, code, description 
                               FROM calendar WHERE sem_id=?`;
        const scheduleQuery = `SELECT schedule_id, course_id, day, hour 
                               FROM schedules WHERE sem_id=?`;
        const params = [semId];
        const [calendarData] = await mydb.query(calendarQuery,params);
        const [scheduleData] = await mydb.query(scheduleQuery,params);

        const calendarMap = new Map();
        calendarData.forEach(calendar=>{
            calendarMap.set(calendar.event_date.toISOString().split('T')[0], calendar);
        });

        const scheduleMap = new Map();
        scheduleData.forEach(schedule=>{
            if(!scheduleMap.has(schedule.day))
            {
                scheduleMap.set(schedule.day,[]);
            }
            scheduleMap.get(schedule.day).push(schedule);
        });

        let currentDate = new Date(fromDate);
        const endDate = new Date(toDate);
        const rows=[];

        const getInsertData = (day,formattedDate) =>{
            const schedule = scheduleMap.get(day);
            if(!schedule) return;
            schedule.forEach(sch=>{
                const insertData = [semId, formattedDate, sch.schedule_id, 0];
                rows.push(insertData);
            } );
        }

        const checkEffectiveDay = (event) => {
            if(!event)
            {
                if(currentDate.getDay() === 0) return false;
                else return true;
                
            }

            else
            {
                if( event.code === 1 || event.code === 2 ) return false;
                else return true;
                
            }
        }

        while(currentDate<=endDate)
        {
            const formattedDate =currentDate.toISOString().split('T')[0];
            const event = calendarMap.get(formattedDate);
            const effectiveDay = checkEffectiveDay(event);
            if(effectiveDay)
            {
                const day = event?event.description:currentDate.getDay();
                getInsertData(day, formattedDate);
            }

            currentDate.setDate(currentDate.getDate()+1);
        }

        const insertQuery = `INSERT INTO attendance (sem_id, attendance_date, 
                            schedule_id, status)
                            VALUES ?`;

        rows && rows.length>0 && await mydb.query(insertQuery,[rows]);
        
    }

}

export default Semester