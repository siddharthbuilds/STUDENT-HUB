import "./AttendancePage.css"
import {HeaderDashBoard} from "../Components/dashboard/HeaderDashBoard"
import { RadioButtons } from "../Components/attendance/RadioButtons"
import { DateSelector } from "../Components/attendance/DateSelector"
import {EachHour } from "../Components/attendance/EachHour"
import {AttendanceContainer} from "../Components/attendance/AttendanceContainer"
import {AttendanceSelector} from "../Components/attendance/AttendanceSelector"
import { ButtonLogin } from "../Components/login/ButtonLogin"
import { Toast } from "../Components/register/Toast"
import { ConfirmationBox } from "../Components/attendance/ConfirmationBox"
import { useState } from "react"
export function AttendancePage()
{
    const [courseWise, setCourseWise] = useState(false);
    const [dayWise, setDayWise] = useState(true);
    const [trackConfirmation, setTrackConfirmation] = useState(false);

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
    return(
        <>
        <div className={trackConfirmation?"div-noblur div-blur":"div-noblur"}>
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
            </>}
            {courseWise&&<AttendanceContainer />}
        </div>
            
            {trackConfirmation&&<ConfirmationBox setTrackConfirmation={setTrackConfirmation}/>}
        </>
    )
}