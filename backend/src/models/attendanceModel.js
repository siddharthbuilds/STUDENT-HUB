import mydb from "../config/database.js";
class Attendance
{
    static formatDate(date) 
    {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    }

    static async generateAttendance({connection,semId,fromDate,toDate})
    {
        const calendarQuery = `SELECT calendar_id, event_date, code, description 
                               FROM calendar WHERE sem_id=?`;
        const scheduleQuery = `SELECT schedule_id, course_id, day, hour 
                               FROM schedules WHERE sem_id=?`;
        const params = [semId];
        const [calendarData] = await connection.query(calendarQuery,params);
        const [scheduleData] = await connection.query(scheduleQuery,params);

        const calendarMap = new Map();
        calendarData.forEach(calendar=>{
            calendarMap.set(Attendance.formatDate(calendar.event_date), calendar);
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
            const formattedDate = Attendance.formatDate(currentDate);
            const event = calendarMap.get(formattedDate);
            const effectiveDay = checkEffectiveDay(event);
            if(effectiveDay)
            {
                const day = event?parseInt(event.description):currentDate.getDay();
                getInsertData(day, formattedDate);
            }

            currentDate.setDate(currentDate.getDate()+1);
        }

        const insertQuery = `INSERT INTO attendance (sem_id, attendance_date, 
                            schedule_id, status)
                            VALUES ?`;
        rows && rows.length>0 && await connection.query(insertQuery,[rows]);
        
    }

    static async getAttendance({semId,attendanceDate})
    {
        const attendanceQuery = `SELECT
                        attendance.attendance_id,
                        attendance.status,
                        attendance.editable,
                        courses.course_name,
                        schedules.hour

                        FROM attendance

                        JOIN schedules
                            ON attendance.schedule_id = schedules.schedule_id

                        JOIN courses
                            ON schedules.course_id = courses.course_id

                        WHERE attendance.sem_id = ?
                            AND attendance.attendance_date = ?
                        ORDER BY schedules.hour;` ;
        const params = [semId,attendanceDate];
        const [attendanceRows] = await mydb.query(attendanceQuery,params);
        return attendanceRows;
    }

    static async updateAttendance({attendanceChanges,connection})
    {
        // if(attendanceChanges.length===0)
        //     {return;}
        const newStatusQuery=`UPDATE attendance SET status=?, editable = FALSE 
                            WHERE attendance_id=? AND editable=TRUE`;
        for (const attendance of attendanceChanges) {
            if (![1, 0, -1].includes(attendance.status)) {
                throw new Error("Invalid attendance status");
            }
            await connection.query(
                newStatusQuery,
                [attendance.status, attendance.attendance_id]
            );
        }
    }

    static async getCourseSummary({semId})
    {
        const query = `SELECT
                        c.course_id,
                        c.course_name,

                        COUNT(*) AS total_hours,

                        SUM(
                            CASE
                                WHEN a.status = 1 THEN 1
                                ELSE 0
                            END
                        ) AS total_present,

                        SUM(
                            CASE
                                WHEN a.status = -1 THEN 1
                                ELSE 0
                            END
                        ) AS total_absent

                    FROM attendance a

                    JOIN schedules s
                    ON a.schedule_id = s.schedule_id

                    JOIN courses c
                    ON s.course_id = c.course_id

                    WHERE a.sem_id = ?

                    GROUP BY c.course_id, c.course_name

                    ORDER BY c.course_name;` ;
        const [rows] = await mydb.query(query,[semId]);
        rows.forEach(course=>{
            course.allowedBunks = Math.floor(course.total_hours * 0.25);
            course.remainingBunks =
                course.allowedBunks - course.total_absent;
        });
        return rows;
    }

    static async planYourBunks({semId})
    {
        const query = `SELECT
                            a.attendance_id,
                            a.attendance_date,
                            a.editable,
                            a.status,

                            c.course_id AS courseId,
                            c.course_name AS courseName

                        FROM attendance a

                        JOIN schedules s
                        ON a.schedule_id = s.schedule_id

                        JOIN courses c
                        ON s.course_id = c.course_id

                        WHERE a.sem_id = ?

                        ORDER BY
                        a.attendance_date,
                        s.hour;`  ;

        const [attendanceRows] = await mydb.query(query,[semId]);
        return attendanceRows;

    }
}

export default Attendance;