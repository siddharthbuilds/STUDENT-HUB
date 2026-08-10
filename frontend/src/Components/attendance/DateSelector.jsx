import "./DateSelector.css";
import { getAttendanceRows } from "../../../api/attendanceApi";
export function DateSelector({data,setAttendanceRows})
{
    const starting = 1;
    const ending = Number(data.last);
    const myRange=[];
    for(let i=starting;i<=ending;i++)
    {
        myRange.push(i);
    }
    async function onSelectDate(num)
    {
        const date = `${data.year}-${data.monthNum}-${num}`;
        console.log(date);
        const attendanceData = await getAttendanceRows(date);
        console.log(attendanceData);
        setAttendanceRows(attendanceData.data.attendanceRows);
    }
    return(
        <div className="div-attendance-dates">
            {myRange.map(number=>{
                return (
                    <div key = {number} className="div-attendance-day">
                        <button 
                        className="btn-attendance-day"
                        onClick={()=>{onSelectDate(number)}}
                        >
                            {number}
                        </button>
                    </div>
                )
            })}
        </div>
    )
}