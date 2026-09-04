import "./AttendancePage.css"
import { RadioButtons } from "../Components/attendance/RadioButtons"
import {EachHour } from "../Components/attendance/EachHour"
import {AttendanceContainer} from "../Components/attendance/AttendanceContainer"
import {AttendanceSelector} from "../Components/attendance/AttendanceSelector"
import { ButtonLogin } from "../Components/login/ButtonLogin"
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
    const [originalRows, _setOriginalRows] = useState([]);
    const [isDirty,setIsDirty] = useState(false);
    const [courseSummary,setCourseSummary] = useState([]);
    const {semesterDetails} = useSemester();
    const [error, setError] = useState('');
    const [trackDirty, setTrackDirty] = useState(false);
    const [plannerRows, setPlannerRows] = useState([]);
    const [dateSelected,setDateSelected] = useState(1);

    const semId = semesterDetails && semesterDetails.semId;

    useEffect(()=>{
        async function getPlannerRows()
        {
            if(!semId) return;
            const response = await planYourBunks(semId);
            setPlannerRows(response.data.attendanceRows);
        }
        getPlannerRows();
    },[semId])

    async function styleCourseWise()
    {
        try
        {
            if(plannerMode)
            {
                calculatePlannerSummary(plannerRows);
            }
            else
            {
                const response = await getCourseSummary(semId);
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
        try{
            await updateAttendance({attendanceChanges: attendanceRows},semId);
            setIsDirty(false);
        }
        catch(err)
        {
            setError(err.message);
        }
    }

    function revertChanges()
    {
        setAttendanceRows(originalRows);
        setIsDirty(false);
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

            if(course.remainingBunks<0) {course.remainingBunks=0;}

        });

        setCourseSummary(summary);
    }

    const months = semesterDetails?
            getMonths(semesterDetails.startDate, semesterDetails.endDate)
            :[];

    return(
        <>
            <div className={trackConfirmation?"div-noblur div-blur":"div-noblur"}>
                <div className="attendance-page-shell">
                    <div className="attendance-page-content">
                        <div className="attendance-page-intro">
                            <div className="attendance-page-title">
                                {plannerMode ? "Plan Your Bunks" : "Attendance"}
                            </div>
                            <div className={`attendance-page-subtitle ${plannerMode ? "planner-description" : ""}`}>
                                <div className="attendance-description-main">
                                    {!plannerMode?
                                    `• Track your daily attendance and stay on top of your semester.`:
                                    `• Play around with your attendance-changing any past or future day's attendance and instantly see how your attendance and remaining bunks change.`}
                                </div>

                                <div className={plannerMode ? "planner-unsaved-note" : "attendance-description-main"}>
                                    {!plannerMode?
                                    `• Mark classes as Present or Absent and keep your attendance records up to date.`:
                                    `• Nothing is saved — all changes are temporary and are only for planning and experimenting.`}
                                </div>
                            </div>
                        </div>

                        <AttendanceSelector dayWise={dayWise}
                        styleDayWise={styleDayWise}
                        styleCourseWise={styleCourseWise}
                        />

                        {dayWise&&<>
                            <div className="attendance-day-section">
                                <RadioButtons months={months}
                                            setAttendanceRows={setAttendanceRows}
                                            setAttendanceType={setAttendanceType}
                                            isDirty={isDirty}
                                            setTrackConfirmation={setTrackConfirmation}
                                            setTrackDirty={setTrackDirty}
                                            plannerMode={plannerMode}
                                            plannerRows={plannerRows}
                                            dateSelected={dateSelected}
                                            setDateSelected={setDateSelected}
                                />

                                <div className="attendance-hours-panel">
                                    <div className="attendance-hours-heading">
                                        <span>Today's Hours</span>
                                        <span className="attendance-hours-hint">
                                            Tap the circle to change: Present → Absent → Not Marked
                                        </span>
                                    </div>

                                    <EachHour attendanceRows={attendanceRows} attendanceType={attendanceType}
                                        setAttendanceRows={setAttendanceRows} plannerMode={plannerMode}
                                        originalRows={originalRows} setIsDirty={setIsDirty}
                                        setPlannerRows={setPlannerRows} plannerRows={plannerRows}
                                    />
                                </div>

                                {!plannerMode&&attendanceType==1&&<div className="attendance-save-wrap">
                                    <ButtonLogin text="Save" onClick={onClickSave}/>
                                </div>}
                            </div>
                        </>}

                        {courseWise&&<div className="attendance-course-section">
                            <div className="attendance-course-heading">
                                <span>Course Overview</span>
                                <span className="attendance-hours-hint">Live attendance summary</span>
                            </div>
                            <AttendanceContainer courseSummary={courseSummary}/>
                        </div>}
                    </div>
                </div>
            </div>

            {trackDirty&&<ConfirmationBox
                message1="Save or revert your changes before proceeding.."
                option1="Save"
                option2="Revert"
                setTrackConfirmation={setTrackDirty}
                saveFunction={()=>{setTrackConfirmation(true)}}
                cancelFunction={revertChanges}
            />}

            {trackConfirmation&&<ConfirmationBox
                message1="Are you sure want to save the changes?"
                message2="Note: Data once Saved, cannot be edited."
                option1="Save"
                option2="Cancel"
                toastmessage="All Changes Saved"
                setTrackConfirmation={setTrackConfirmation}
                saveFunction={saveAttendance}
            />}

            {error && <p className="attendance-error">{error}</p>}
        </>
    )
}
