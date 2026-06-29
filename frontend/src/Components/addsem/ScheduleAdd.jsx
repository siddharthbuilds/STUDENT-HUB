import "./ScheduleAdd.css"
import { ButtonAddCourse } from "./ButtonAddCourse"
import { CourseBox } from "./CourseBox";
import { CourseListContainer } from "./CourseListContainer";
import { useState } from "react"


export function ScheduleAdd({courseList,setCourseList})
{
    const [showCourseBox, setShowCourseBox] = useState(false);
    // const [hourList,setHourList]=useState([]);
    // const dropdown1=["a","b","c"];
    const dropdown2=["x 1","x 2","x 3"];
    function toggleShowCourseBox()
    {
        setShowCourseBox(!showCourseBox);
    }
    return(
        <>
        <div className="div-btn-schedule-add">
        <ButtonAddCourse text="+ Add Hours" toggleShowCourseBox={toggleShowCourseBox}/>
        </div>
        {showCourseBox&&<CourseBox toggleShowCourseBox={toggleShowCourseBox}
                            courseList={courseList}
                            setCourseList={setCourseList}
                            dropdown1={courseList}
                            dropdown2={dropdown2}
        />}
        {courseList.length>0&&<CourseListContainer courseList={courseList} 
                                setCourseList={setCourseList}
                                property2="mon"
                                />}
        </>
    )
}