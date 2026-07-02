import "./ExamSection.css"
import { ButtonAddCourse } from "./ButtonAddCourse"
import { CourseBox } from "./CourseBox"
import { CourseListContainer } from "./CourseListContainer"
import { useState } from "react"
export function ExamSection()
{
    const [showCourseBox,setShowCourseBox] = useState(false);
    const [examList,setExamList]=useState([]);
    function toggleShowCourseBox()
    {
        setShowCourseBox(!showCourseBox);
    }
    return(<>
        <div className="div-exam-section">
            <div className="div-exam-section-header">
                Exams
            </div>
            <div className="div-exam-section-body">
                <ButtonAddCourse text="+ Add Exam" toggleShowCourseBox={toggleShowCourseBox}/>
                {showCourseBox&&<CourseBox type1="date" type2="date" toggleShowCourseBox={toggleShowCourseBox}
                    courseList={examList}
                    setCourseList={setExamList}
                ></CourseBox>}
            </div>
             <CourseListContainer courseList={examList} setCourseList={setExamList}
                    type="date" property2="des"
                />
        </div>
    </>)
}