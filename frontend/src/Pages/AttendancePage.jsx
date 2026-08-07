import "./AttendancePage.css"
import {HeaderDashBoard} from "../Components/dashboard/HeaderDashBoard"
import { RadioButtons } from "../Components/attendance/RadioButtons"
import {EachHour } from "../Components/attendance/EachHour"
import {AttendanceContainer} from "../Components/attendance/AttendanceContainer"
import {AttendanceSelector} from "../Components/attendance/AttendanceSelector"
import { ButtonLogin } from "../Components/login/ButtonLogin"
import { Toast } from "../Components/register/Toast"
import { ConfirmationBox } from "../Components/attendance/ConfirmationBox"
import { useState } from "react"
import {useSemester} from "../context/useSemester.js";
import { getMonths } from "../Utils/getMonths.js";
export function AttendancePage({plannerMode=false})
{
    const [courseWise, setCourseWise] = useState(false);
    const [dayWise, setDayWise] = useState(true);
    const [trackConfirmation, setTrackConfirmation] = useState(false);
    const [attendanceRows,setAttendanceRows] = useState([]);
    const [courseSummary,setCourseSummary] = useState([]);
    const {semesterDetails} = useSemester();

    function styleCourseWise(){
        setCourseWise(true);
        setDayWise(false)
    }
    function styleDayWise(){
        setDayWise(true);
        setCourseWise(false)
    }

    function onClickSave(){
            setTrackConfirmation(true);
    }

    function calculateSummary(rows)
    {
        const grouped = {};
        rows.forEach(row => {
            if(!grouped[row.courseId])
            {
                grouped[row.courseId] = {
                    courseId: row.courseId,
                    course_name: row.courseName,
                    total_hours: 0,
                    total_present: 0,
                    total_absent: 0
                };
            }
            grouped[row.courseId].total_hours++;
            if(row.status === 1)
                grouped[row.courseId].total_present++;

            if(row.status === -1)
                grouped[row.courseId].total_absent++;

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
    const months = getMonths(semesterDetails.startDate, semesterDetails.endDate);
    
    return(
        <>
        <div className={trackConfirmation?"div-noblur div-blur":"div-noblur"}>
            <HeaderDashBoard />
            <AttendanceSelector dayWise={dayWise} 
            styleDayWise={styleDayWise}
            styleCourseWise={styleCourseWise}
            />
            {dayWise&&<>
            <RadioButtons months={months}/>
            <EachHour attendanceRows={attendanceRows}
                 setAttendanceRows={setAttendanceRows} plannerMode={plannerMode}
                calculateSummary={calculateSummary}/>
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
            setTrackConfirmation={setTrackConfirmation}/>}
        </>
    )
}