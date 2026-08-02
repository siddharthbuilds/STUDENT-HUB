import mydb from "../config/database.js";
class Calendar
{
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

    static async addCalendar({connection,semId,list,code})
    {
        const query = `INSERT INTO calendar (sem_id, event_date, code, description)
                        VALUES ?`;
        const rows = [];
        list.forEach(element =>{
            const dates = Calendar.getDatesBetween(element.from, element.to);
            dates.forEach(date=>{
                rows.push([semId, date, code, element.description]);
            })
        });
        rows && rows.length>0 && await connection.query(query,[rows]); 

    }

    static async addSaturdays({connection,semId, saturdays})
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
        rows && rows.length>0 && await connection.query(query,[rows]); 
    }

    static async getCalendar({semId,attendanceDate})
    {
        const calendarQuery = `SELECT code,description FROM calendar
                                WHERE sem_id=? AND event_date=?`;
        const params = [semId,attendanceDate];
        const [attendanceRows] = await mydb.query(calendarQuery,params);
        return attendanceRows;
        
    }
}

export default Calendar;