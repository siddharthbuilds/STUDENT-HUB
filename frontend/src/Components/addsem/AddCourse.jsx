import "./AddCourse.css"
import {CourseBox} from "./CourseBox.jsx"
export function AddCourse()
{
    // let courseList = [];

    return (
        <>
        <div className="div-addcourse">
            <div className="div-addcourse-text"> Add Your Courses</div>
            <div className="div-btn-addcourse">
                <button className="btn-addcourse"> + </button>
            </div>
            <CourseBox />
        </div>
        </>
    )
}