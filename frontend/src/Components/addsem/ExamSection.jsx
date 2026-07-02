import "./ExamSection.css"
import { ButtonAddCourse } from "./ButtonAddCourse"
import { CourseBox } from "./CourseBox"
import { CourseListContainer } from "./CourseListContainer"
import { useState } from "react"
export function ExamSection({headerName, buttonName,examList,setExamList})
{
    const [showCourseBox,setShowCourseBox] = useState(false);
    function toggleShowCourseBox()
    {
        setShowCourseBox(!showCourseBox);
    }
    return(<>
        <div className="div-exam-section">
            <div className={showCourseBox?"div-exam-section-header blurred":"div-exam-section-header"}>
                {headerName}
            </div>
            <div className="div-exam-section-body" style={{position:"relative"}}>
                <ButtonAddCourse text={`+ Add ${buttonName}`} toggleShowCourseBox={toggleShowCourseBox}/>
                {showCourseBox&&
                    <CourseBox type1="date" type2="date" toggleShowCourseBox={toggleShowCourseBox}
                    courseList={examList}
                    setCourseList={setExamList}
                ></CourseBox>}
            </div>
            <div className={showCourseBox?"blurred":""}>
                <CourseListContainer courseList={examList} setCourseList={setExamList}
                type="date" property2="des"
                />
            </div>
             
        </div>
    </>)
}