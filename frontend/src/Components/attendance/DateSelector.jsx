import "./DateSelector.css";
import { getAttendanceRows } from "../../../api/attendanceApi";
export function DateSelector({
        data,setAttendanceRows,setAttendanceType,isDirty,
        setTrackDirty,plannerMode,plannerRows
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
        const date = `${data.year}-${data.monthNum<10?`0${data.monthNum}`:`${data.monthNum}`}-${num<10?`0{num}`:`${num}`}`;
        if(!plannerMode)
        {
            const attendanceData = await getAttendanceRows(date);
            setAttendanceRows(attendanceData.data.attendanceRows);
            setAttendanceType(attendanceData.data.type);
        }
        else
        {
            const attendanceData = plannerRows.filter(row=>{
                const rowDate = new Date (row.attendance_date);
                const strDate = rowDate.toLocaleDateString('en-CA');
                if(strDate == date) return row;
            }
            );
            setAttendanceRows(attendanceData);
            setAttendanceType(1);
        }
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