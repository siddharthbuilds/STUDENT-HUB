import "./ScheduleAdd.css"
import { ButtonAddCourse } from "./ButtonAddCourse"
import { CourseBox } from "./CourseBox";
import { useState } from "react"


export function ScheduleAdd()
{
    const [showCourseBox, setShowCourseBox] = useState(false);
    const [hourList,setHourList]=useState([]);
    const dropdown1=["a","b","c"];
    const dropdown2=["x 1","x 2","x 3"];
    function toggleShowCourseBox()
    {
        setShowCourseBox(!showCourseBox);
    }
    return(
        <>
        <ButtonAddCourse text="+ Add Hours" toggleShowCourseBox={toggleShowCourseBox}/>
        {showCourseBox&&<CourseBox toggleShowCourseBox={toggleShowCourseBox}
                            courseList={hourList}
                            setCourseList={setHourList}
                            dropdown1={dropdown1}
                            dropdown2={dropdown2}
        />}
        </>
    )
}