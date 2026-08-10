import "./AttendancePage.css"
import {HeaderDashBoard} from "../Components/dashboard/HeaderDashBoard"
import { RadioButtons } from "../Components/attendance/RadioButtons"
import {EachHour } from "../Components/attendance/EachHour"
import {AttendanceContainer} from "../Components/attendance/AttendanceContainer"
import {AttendanceSelector} from "../Components/attendance/AttendanceSelector"
import { ButtonLogin } from "../Components/login/ButtonLogin"
import { Toast } from "../Components/register/Toast"
import { ConfirmationBox } from "../Components/attendance/ConfirmationBox"
import { useEffect, useState } from "react"
import {useSemester} from "../context/useSemester.js";
import { getMonths } from "../Utils/getMonths.js";
import { getCourseSummary } from "../../api/attendanceApi.js";
import { updateAttendance } from "../../api/attendanceApi.js";
import { planYourBunks } from "../../api/attendanceApi.js"
export function AttendancePage({plannerMode=false})
{
    const [courseWise, setCourseWise] = useState(false);
    const [dayWise, setDayWise] = useState(true);
    const [trackConfirmation, setTrackConfirmation] = useState(false);
    const [attendanceRows,setAttendanceRows] = useState([]);
    const [attendanceType,setAttendanceType] = useState(null);
    const [changedAttendance, setChangedAttendance] = useState([]);
    const [courseSummary,setCourseSummary] = useState([]);
    const {semesterDetails} = useSemester();
    const [error, setError] = useState('');

    async function styleCourseWise()
    {
        try
        {
            if(plannerMode)
            {
                const response = await planYourBunks();
                const plannerRows = response.data.attendanceRows;
                console.log(plannerRows);
                calculatePlannerSummary(plannerRows);
            }
            else
            {
                const response = await getCourseSummary();

                setCourseSummary(
                    response.data.courseSummary
                );
            }

            setCourseWise(true);
            setDayWise(false);
        }
        catch(err)
        {
            setError(
                err.response?.data?.message ||
                "Failed to get course summary"
            );
        }
    }

    function styleDayWise(){
        setDayWise(true);
        setCourseWise(false)
    }

    function onClickSave(){
            setTrackConfirmation(true);
    }

    async function saveAttendance() 
    {
        try {

            if (changedAttendance.length === 0) {
                setTrackConfirmation(false);
                return;
            }

            await updateAttendance({
                attendanceChanges: changedAttendance
            });

            setAttendanceRows(prev =>
                prev.map(row => {

                    const changed = changedAttendance.find(
                        change =>
                            change.attendance_id ===
                            row.attendance_id
                    );

                    if (!changed)
                        return row;

                    return {
                        ...row,
                        status: changed.status,
                        editable: false
                    };
                })
            );

            setChangedAttendance([]);

            setTrackConfirmation(false);

        }
        catch (err) {

            setError(
                err.response?.data?.message ||
                "Failed to update attendance"
            );

        }
    }

    function calculatePlannerSummary(rows)
    {
        const grouped = {};

        rows.forEach(row => {

            if(!grouped[row.course_id])
            {
                grouped[row.course_id] = {
                    courseId: row.course_id,
                    course_name: row.course_name,
                    total_hours: 0,
                    total_present: 0,
                    total_absent: 0
                };
            }

            grouped[row.course_id].total_hours++;

            if(row.status === 1)
                grouped[row.course_id].total_present++;

            if(row.status === -1)
                grouped[row.course_id].total_absent++;
        });

        const summary = Object.values(grouped);

        summary.forEach(course => {

            course.allowedBunks =
                Math.floor(course.total_hours * 0.25);

            course.remainingBunks =
                course.allowedBunks - course.total_absent;

        });

        setCourseSummary(summary);
    }

    const months = semesterDetails?
            getMonths(semesterDetails.startDate, semesterDetails.endDate)
            :[];
    useEffect(()=>{
        async function fetchCourseSummary()
        {
            try{
                const response = await getCourseSummary();
                setCourseSummary(response.data.courseSummary);
            }

            catch(err){
                setError(err.response?.data?.message);
            }
        }
        fetchCourseSummary();
    },[]);

    return(
        <>
        <div className={trackConfirmation?"div-noblur div-blur":"div-noblur"}>
            <HeaderDashBoard />
            <AttendanceSelector dayWise={dayWise} 
            styleDayWise={styleDayWise}
            styleCourseWise={styleCourseWise}
            />
            {dayWise&&<>
            <RadioButtons months={months} 
                        setAttendanceRows={setAttendanceRows}
                        setAttendanceType={setAttendanceType}
                        />
            <EachHour attendanceRows={attendanceRows} attendanceType={attendanceType}
                 setAttendanceRows={setAttendanceRows} plannerMode={plannerMode}
                 setChangedAttendance={setChangedAttendance}/>
            {!plannerMode&&<ButtonLogin text="Save" onClick={onClickSave}/>}
            </>}
            {courseWise&&<AttendanceContainer courseSummary={courseSummary}/>}
        </div>
            
            {trackConfirmation&&<ConfirmationBox 
            message1="Are you sure want to save the changes?"
            message2="Note: Data once Saved, cannot be edited."
            option1="Save"
            option2="Cancel"
            toastmessage="All Changes Saved"
            setTrackConfirmation={setTrackConfirmation}
            saveFunction={saveAttendance}
            />}
            {error && <p style={{ color: "#ef4444" }}>{error}</p>}
        </>
    )
}