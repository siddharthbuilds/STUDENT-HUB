import "./AttendancePage.css"
import {HeaderDashBoard} from "../Components/dashboard/HeaderDashBoard"
import { RadioButtons } from "../Components/attendance/RadioButtons"
import { DateSelector } from "../Components/attendance/DateSelector"
import {EachHour } from "../Components/attendance/EachHour"
import {AttendanceContainer} from "../Components/attendance/AttendanceContainer"
import {AttendanceSelector} from "../Components/attendance/AttendanceSelector"
import { useState } from "react"
export function AttendancePage()
{
    const [courseWise, setCourseWise] = useState(false);
    const [dayWise, setDayWise] = useState(true);

    function styleCourseWise(){
        setCourseWise(true);
        setDayWise(false)
    }
    function styleDayWise(){
        setDayWise(true);
        setCourseWise(false)
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
            </>}
            {courseWise&&<AttendanceContainer />}
        </>
    )
}