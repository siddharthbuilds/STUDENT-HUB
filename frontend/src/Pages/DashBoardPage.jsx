import {HeaderDashBoard} from "../Components/dashboard/HeaderDashBoard";
import {DashBoard} from "../Components/dashboard/DashBoard";
import "./DashBoardPage.css";
import attendanceImage from "../images/attendance-icon.webp"
import pybImage from "../images/wink.webp"
import marksImage from "../images/marks.webp"
export function DashBoardPage()
{
    const options=[
        {
            image:attendanceImage,
            text: "Attendance",
            navigate: "/attendance"
        },
        {
            image: pybImage,
            text: "Plan Your Bunks",
            navigate: "/planner"
        },
        {
            image:marksImage,
            text: "Grades",
            navigate: "/grades"
        }
    ]
    return(
        <>
        <HeaderDashBoard />
        <DashBoard options={options}/>
        </>
    )
}