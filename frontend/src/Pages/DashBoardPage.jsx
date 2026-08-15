import {HeaderDashBoard} from "../Components/dashboard/HeaderDashBoard";
import {DashBoard} from "../Components/dashboard/DashBoard";
import "./DashBoardPage.css";
import attendanceImage from "../images/attendance-icon.webp"
import pybImage from "../images/wink.webp"
import marksImage from "../images/marks.webp"
import { useSemester } from "../context/useSemester";
export function DashBoardPage()
{
    const {semesterDetails} = useSemester();
    const semId = semesterDetails.semId;
    const options=[
        {
            image:attendanceImage,
            text: "Attendance",
            navigate: `/dashboard/${semId}/attendance`
        },
        {
            image: pybImage,
            text: "Plan Your Bunks",
            navigate: `/dashboard/${semId}/planner`
        },
        {
            image:marksImage,
            text: "Grades",
            navigate: `/dashboard/${semId}/grades`
        }
    ]
    return(
        <>
        <HeaderDashBoard />
        <DashBoard options={options}/>
        </>
    )
}