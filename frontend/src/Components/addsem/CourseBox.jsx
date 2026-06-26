import "./CourseBox.css"
import { Input } from "../login/Input.jsx"
import {ButtonLogin} from "../login/ButtonLogin.jsx"
import { useState } from "react"
export function CourseBox({toggleShowCourseBox, courseList, setCourseList})
{
    const [courseName, setCourseName] = useState('');
    const [courseCredits, setCourseCredits]= useState('');

    function trackCourseName(event)
    {
        setCourseName(event.target.value);
    }

    function trackCourseCredits(event)
    {
        setCourseCredits(event.target.value);
    }


    function addCourseBtn()
    {
        const obj = {courseName,courseCredits};
        const newList = [...courseList,obj];
        setCourseList(newList);
        toggleShowCourseBox();
    }

    return(
        <>
        <div className="div-course-box">
            <div className="div-course-attributes">
                <Input placeholder="Course Name" size="40" onChange={trackCourseName}/>
                <Input placeholder="Credits" size="3" onChange={trackCourseCredits}/>
            </div>
            <div>
                <ButtonLogin text="Add" onClick={addCourseBtn}/>
            </div>
        </div>
        </>
    )
}