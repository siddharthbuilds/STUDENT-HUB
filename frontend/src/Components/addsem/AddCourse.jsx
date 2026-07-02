import { useState } from "react"
import "./AddCourse.css"
import {CourseBox} from "./CourseBox.jsx"
import { CourseListContainer } from "./CourseListContainer.jsx";
import { CourseList } from "./CourseList.jsx";
import { ButtonAddCourse } from "./ButtonAddCourse.jsx";
export function AddCourse({courseList,setCourseList})
{
    
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
                <ButtonAddCourse toggleShowCourseBox={toggleShowCourseBox}
                    text="+ Add" />
                <div className="div-btn-addcourse-count">
                    {courseList.length>1?`${courseList.length} Courses`
                        :courseList.length==1?"1 Course"
                        :"No Courses"} Added 
                    </div>
            </div>
            {courseList.length>0&&<CourseListContainer courseList={courseList} 
                setCourseList={setCourseList} keyword="C R E D I T S" 
                property2="courseCredits"/>}
        </div>
         {showCourseBox&&<CourseBox toggleShowCourseBox={toggleShowCourseBox} 
                            courseList={courseList}
                            setCourseList={setCourseList}
                            type2="number" />
                            }
         
        </>
    )
}