import "./DateSelector.css";
import { getAttendanceRows } from "../../../api/attendanceApi";
import { useSemester } from "../../context/useSemester";
import formatDate from "../../Utils/FormatDate";
export function DateSelector({
        data,setAttendanceRows,setAttendanceType,isDirty,
        setTrackDirty,plannerMode,plannerRows,dateSelected, setDateSelected
    })
{
    const starting = 1;
    const ending = data&&Number(data.last);
    const myRange=[];
    for(let i=starting;i<=ending;i++)
    {
        myRange.push(i);
    }
    const {semesterDetails} = useSemester();
    const semId = semesterDetails.semId;
    async function onSelectDate(num)
    {
        setDateSelected(num);
        const date = `${data.year}-${data.monthNum<10?`0${data.monthNum}`:`${data.monthNum}`}-${num<10?`0${num}`:`${num}`}`;
        if(!plannerMode)
        {
            const attendanceData = await getAttendanceRows(date,semId);
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
        <div>
        <div className="div-attendance-dates">
            {myRange.map(number=>{
                return (
                    <div key = {number} className="div-attendance-day">
                        <button 
                        className=
                            {number===dateSelected?
                                "btn-attendance-day selected"
                                    :"btn-attendance-day"}
                        onClick={()=>{confirmationFunction(number)}}
                        >
                            {number}
                        </button>
                    </div>
                )
            })}
        </div>
        <div className="div-attendance-page-title"
                style={{display:"flex", justifyContent:"center",marginTop:"5px"}}
            >
                {`Selected Date: ${formatDate(`${data.year}-${data.month}-${dateSelected}`)}`}
        </div>
        </div>
    )
}