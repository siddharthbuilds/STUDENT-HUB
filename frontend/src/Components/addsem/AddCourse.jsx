import { useState } from "react"
import "./AddCourse.css"
import {CourseBox} from "./CourseBox.jsx"
import { CourseListContainer } from "./CourseListContainer.jsx";
import { CourseList } from "./CourseList.jsx";
export function AddCourse()
{
    const [courseList,setCourseList] = useState([]);
    const [showCourseBox,setShowCourseBox] = useState(false);
    function toggleShowCourseBox()
    {
        setShowCourseBox(!showCourseBox);
    }
    return (
        <>
        <div className={showCourseBox?"div-addcourse blurred":"div-addcourse"}>
            <div className="div-addcourse-text"> Add Your Courses</div>
            <div className="div-btn-addcourse">
                <button className="btn-addcourse" onClick={toggleShowCourseBox}> + </button>
            </div>
            <CourseListContainer courseList={courseList}/>
        </div>
         {showCourseBox&&<CourseBox toggleShowCourseBox={toggleShowCourseBox} 
                            courseList={courseList}
                            setCourseList={setCourseList} />
                            }
         
        </>
    )
}