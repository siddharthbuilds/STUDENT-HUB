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
    const courses = [{courseName: 'Java', status: 1},
        {courseName: 'Python', status: -1}];

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
            styleCourseWise={styleCourseWise}
            />
            {dayWise&&<>
            <RadioButtons months={['July','August','September','October']}/>
            <DateSelector start="1" end="15"/>
            <EachHour courses={courses}/>
            <ButtonLogin text="Save" onClick={onClickSave}/>
            </>}
            {courseWise&&<AttendanceContainer />}
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