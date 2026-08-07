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
        const attendanceData = await getAttendanceRows(date);
        setAttendanceRows(attendanceData.data.attendanceRows);
    }
    return(
        <div className="div-attendance-dates">
            {myRange.map(number=>{
                return (
                    <div className="div-attendance-day">
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