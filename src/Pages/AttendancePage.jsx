import "./AttendancePage.css"
import {HeaderDashBoard} from "../Components/dashboard/HeaderDashBoard"
import { RadioButtons } from "../Components/attendance/RadioButtons"
import { DateSelector } from "../Components/attendance/DateSelector"
import {EachHour } from "../Components/attendance/EachHour"
import {AttendanceContainer} from "../Components/attendance/AttendanceContainer"
export function AttendancePage()
{
    return(
        <>
            <HeaderDashBoard />
            <RadioButtons />
            <DateSelector />
            <EachHour />
            <AttendanceContainer />
        </>
    )
}