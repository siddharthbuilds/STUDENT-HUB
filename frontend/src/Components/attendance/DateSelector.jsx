import "./DateSelector.css";
import { getAttendanceRows } from "../../../api/attendanceApi";
export function DateSelector({
        data,setAttendanceRows,setAttendanceType,isDirty,
        setTrackDirty
    })
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
        setAttendanceType(attendanceData.data.type);
    }
    function confirmationFunction(number)
    {
        if(isDirty)
        {
            setTrackDirty(true);
        }
        else{
            onSelectDate(number);
        }
    }
    return(
        <div className="div-attendance-dates">
            {myRange.map(number=>{
                return (
                    <div key = {number} className="div-attendance-day">
                        <button 
                        className="btn-attendance-day"
                        onClick={()=>{confirmationFunction(number)}}
                        >
                            {number}
                        </button>
                    </div>
                )
            })}
        </div>
    )
}