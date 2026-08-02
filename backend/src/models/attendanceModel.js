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
            const formattedDate =currentDate.toISOString().split('T')[0];
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
                        courses.course_name

                        FROM attendance

                        JOIN schedules
                        ON attendance.schedule_id = schedules.schedule_id

                        JOIN courses
                        ON schedules.course_id = courses.course_id

                        WHERE attendance.sem_id = ?
                        AND attendance.attendance_date = ?;` ;
        const params = [semId,attendanceDate];
        const [attendanceRows] = await mydb.query(attendanceQuery,params);
        return attendanceRows;
    }

    static async updateAttendance({attendanceId})
    {
        let newStatus;
        const statusQuery=`SELECT status FROM attendance WHERE attendance_id=?`;
        const newStatusQuery=`UPDATE attendance SET status=? WHERE attendance_id=?`;
        const [queryResult] = await mydb.query(statusQuery,[attendanceId]);
        const status = parseInt(queryResult[0].status);
        switch(status)
        {
            case 0:
                newStatus=1;
                break;

            case 1:
                newStatus=-1;
                break;

            default:
                newStatus=0;
        }
        await mydb.query(newStatusQuery,[newStatus,attendanceId]);
        return newStatus;
    }
}

export default Attendance;