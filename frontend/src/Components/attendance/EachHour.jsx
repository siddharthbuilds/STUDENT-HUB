import "./EachHour.css";
import { useState } from "react";

export function EachHour({
    attendanceRows,
    attendanceType,
    setAttendanceRows,
    plannerMode,setIsDirty
}) {
    const [error, _setError] = useState("");

    function toggleStatus(attendanceId)
    {
        if(!plannerMode)
        {
            const current = attendanceRows.find(row=>row.attendance_id === attendanceId);
            if(!current || current.editable===0) return;
            else{
                const oldStatus = current.status;
                let newStatus;
                switch(oldStatus)
                {
                    case 0: newStatus=1; break;
                    case 1: newStatus=-1; break;
                    default: newStatus=0; break;
                }
                const editedRows = attendanceRows.map(row =>
                                    row.attendance_id === attendanceId
                                        ? { ...row, status: newStatus, isModified:true}
                                        : row
                                );

                setAttendanceRows(editedRows);
                const filteredRows = editedRows.filter(row=> row.isModified=== true)
                if(filteredRows.find(row=> row.status === 1 || row.status === -1))
                    {setIsDirty(true);}
                else {setIsDirty(false);}
        }
        }
    }

    return (
        <div className="div-attendance-hours">

            {
                attendanceType==1&&
                attendanceRows &&
                attendanceRows.length > 0 &&
                attendanceRows.map((attendance) => {
                    return (
                        <div
                            key={attendance.attendance_id}
                            className="div-attendance-eachhour"
                        >

                            <div className="div-attendance-hourname">
                                {attendance.course_name}
                            </div>

                            <div className="div-attendance-hourstatus">

                                <button
                                    onClick={() =>
                                        toggleStatus(attendance.attendance_id)
                                    }

                                    className={
                                        attendance.status === 1
                                            ? "btn-status status-present"
                                            : attendance.status === -1
                                                ? "btn-status status-absent"
                                                : "btn-status status-undefined"
                                    }
                                />

                            </div>

                        </div>
                    );

                })
            }

            {
                error &&
                <p style={{ color: "#ef4444" }}>
                    {error}
                </p>
            }

        </div>
    );
}