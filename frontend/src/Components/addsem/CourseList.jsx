import "./CourseList.css"
import {TrashImage} from "../home/TrashImage.jsx"
export function CourseList({courseName, courseCredits})
{
    return(
        <>
            <div className="div-course">
                <div className="div-course-list-name">
                    {courseName}
                </div>
                <div className="div-course-list-credits">
                    <div>{courseCredits}</div>
                    <div className="div-course-list-credits-txt"> C R E D I T S</div>
                </div>
                <div className="div-course-list-btn">
                    <button className="btn-course-list">
                        <TrashImage color="white" size="30"/>
                    </button>
                </div>
            </div>
        </>
    )
}
