import "./AttendancePage.css"
import {HeaderDashBoard} from "../Components/dashboard/HeaderDashBoard"
import { RadioButtons } from "../Components/attendance/RadioButtons"
import { DateSelector } from "../Components/attendance/DateSelector"
import {EachHour } from "../Components/attendance/EachHour"
import {AttendanceContainer} from "../Components/attendance/AttendanceContainer"
import {AttendanceSelector} from "../Components/attendance/AttendanceSelector"
import { ButtonLogin } from "../Components/login/ButtonLogin"
import { Toast } from "../Components/register/Toast"
import { useState } from "react"
export function AttendancePage()
{
    const [courseWise, setCourseWise] = useState(false);
    const [dayWise, setDayWise] = useState(true);
    const [trackSave, setTrackSave] = useState(false);

    function styleCourseWise(){
        setCourseWise(true);
        setDayWise(false)
    }
    function styleDayWise(){
        setDayWise(true);
        setCourseWise(false)
    }

    function onClickSave(){
        setTrackSave(true);
        setTimeout(()=>{
            setTrackSave(false);
        },3000)
    }
    return(
        <>
            <HeaderDashBoard />
            <AttendanceSelector dayWise={dayWise} 
            styleDayWise={styleDayWise}
            courseWise ={courseWise}
            styleCourseWise={styleCourseWise}
            />
            {dayWise&&<>
            <RadioButtons />
            <DateSelector />
            <EachHour />
            <ButtonLogin text="Save" onClick={onClickSave}/>
            <Toast message="All Changes Saved" show={trackSave} />
            </>}
            {courseWise&&<AttendanceContainer />}
        </>
    )
}