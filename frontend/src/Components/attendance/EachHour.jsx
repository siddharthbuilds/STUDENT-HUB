import "./EachHour.css";
import { updateAttendance } from "../../../api/attendanceApi";
import { useState } from "react";
export function EachHour({attendanceRows,
                        setAttendanceRows,
                        plannerMode,})
{
    const [error, setError] = useState('');
   function toggleStatus(index)
    {
        const updatedRows = [...attendanceRows];

        if(!plannerMode &&
            !updatedRows[index].editable)
            return;

        switch(updatedRows[index].status)
        {
            case 0:

                updatedRows[index].status = 1;

                break;

            case 1:

                updatedRows[index].status = -1;

                break;

            default:

                updatedRows[index].status = 0;
        }

        setAttendanceRows(updatedRows);

        //calculateSummary(updatedRows);
    }

    async function onClickAttendanceButton(attendanceRows,index)
    {
        try{

            toggleStatus(index);
            console.log(attendanceRows);
            await updateAttendance({attendanceChanges: attendanceRows});
        }
        catch(err)
        {
            setError(err.response?.data?.message);
        }

    }
    return(
        <div className="div-attendace-hours">
                {attendanceRows && attendanceRows.length>0 &&attendanceRows.map((attendance,index)=>{
                    return (
                        <div className="div-attendance-eachhour">
                            <div className="div-attendance-hourname">
                                {attendance.course_name}
                            </div>
                            <div className="div-attendance-hourstatus">
                                <button
                                    onClick={()=>{onClickAttendanceButton(attendanceRows,index)}}
                                    className={
                                    attendance.status===1
                                    ?"btn-status status-present"
                                    :attendance.status===-1
                                    ?"btn-status status-absent"
                                    :"btn-status status-undefined"
                                    }
                                    />
                            </div>
                        </div>
                    )
                })}
            {error && <p style={{ color: "#ef4444" }}>{error}</p>}
            </div>
    )
}