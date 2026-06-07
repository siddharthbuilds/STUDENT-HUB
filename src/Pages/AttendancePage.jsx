import "./AttendancePage.css"
import {HeaderDashBoard} from "../Components/dashboard/HeaderDashBoard"
import { RadioButtons } from "../Components/attendance/RadioButtons"
export function AttendancePage()
{
    return(
        <>
            <HeaderDashBoard />
            <RadioButtons />
        </>
    )
}