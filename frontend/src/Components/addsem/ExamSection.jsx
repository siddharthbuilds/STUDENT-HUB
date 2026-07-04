import "./ExamSection.css"
import { ButtonAddCourse } from "./ButtonAddCourse"
import { EntryForm } from "./EntryForm"
import { CourseListContainer } from "./CourseListContainer"
import { useState } from "react"
export function ExamSection({headerName, buttonName,examList,setExamList})
{
    const [showEntryForm,setShowEntryForm] = useState(false);
    function toggleShowEntryForm()
    {
        setShowEntryForm(!showEntryForm);
    }
    return(<>
        <div className="div-exam-section">
            <div className={showEntryForm?"div-exam-section-header blurred":"div-exam-section-header"}>
                {headerName}
            </div>
            <div className="div-exam-section-body" style={{position:"relative"}}>
                <ButtonAddCourse text={`+ Add ${buttonName}`} toggleShowEntryForm={toggleShowEntryForm}/>
                {showEntryForm&&
                    <EntryForm type1="date" type2="date" toggleShowEntryForm={toggleShowEntryForm}
                    courseList={examList}
                    setCourseList={setExamList}
                ></EntryForm>}
            </div>
            <div className={showEntryForm?"blurred":""}>
                <CourseListContainer courseList={examList} setCourseList={setExamList}
                type="date" property2="des"
                />
            </div>
             
        </div>
    </>)
}