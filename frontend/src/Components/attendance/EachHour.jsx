import "./EachHour.css";
import { useState } from "react";

export function EachHour({
    attendanceRows,
    setAttendanceRows,
    plannerMode,
    setChangedAttendance
}) {
    const [error, _setError] = useState("");

    function toggleStatus(index) {

        const updatedRows = [...attendanceRows];

        // In normal attendance page,
        // already-saved rows cannot be edited.
        if (
            !plannerMode &&
            !updatedRows[index].editable
        ) {
            return;
        }

        switch (updatedRows[index].status) {

            case 0:
                updatedRows[index].status = 1;
                break;

            case 1:
                updatedRows[index].status = -1;
                break;

            default:
                updatedRows[index].status = 0;
        }

        // Update UI only
        setAttendanceRows(updatedRows);

        // Normal Attendance page:
        // remember this row as changed.
        if (!plannerMode) {

            setChangedAttendance(prev => {

                const existingIndex = prev.findIndex(
                    row =>
                        row.attendance_id ===
                        updatedRows[index].attendance_id
                );

                if (existingIndex !== -1) {

                    const copy = [...prev];

                    copy[existingIndex] = {
                        attendance_id:
                            updatedRows[index].attendance_id,

                        status:
                            updatedRows[index].status
                    };

                    return copy;
                }

                return [
                    ...prev,
                    {
                        attendance_id:
                            updatedRows[index].attendance_id,

                        status:
                            updatedRows[index].status
                    }
                ];
            });
        }
    }

    return (
        <div className="div-attendance-hours">

            {
                attendanceRows &&
                attendanceRows.length > 0 &&
                attendanceRows.map((attendance, index) => {

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
                                        toggleStatus(index)
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