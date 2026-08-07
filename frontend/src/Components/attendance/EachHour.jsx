import "./EachHour.css"
export function EachHour({attendanceRows,
                        setAttendanceRows,
                        plannerMode, calculateSummary})
{
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

        calculateSummary(updatedRows);
    }
    return(
        <div className="div-attendace-hours">
                {attendanceRows&&attendanceRows.length>0&&attendanceRows.map((course,index)=>{
                    return (
                        <div className="div-attendance-eachhour">
                            <div className="div-attendance-hourname">
                                {course.course_name}
                            </div>
                            <div className="div-attendance-hourstatus">
                                <button
                                    onClick={()=>toggleStatus(index)}
                                    className={
                                    course.status===1
                                    ?"btn-status status-present"
                                    :course.status===-1
                                    ?"btn-status status-absent"
                                    :"btn-status status-undefined"
                                    }
                                    />
                            </div>
                        </div>
                    )
                })}
                
            </div>
    )
}