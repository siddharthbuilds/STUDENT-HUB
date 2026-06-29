import "./CourseList.css"
import {TrashImage} from "../home/TrashImage.jsx"
export function CourseList({courseName, courseCredits,courseList,index,setCourseList,keyword})
{
    function removeCourse()
    {
        let newList = courseList.toSpliced(index,1);
        setCourseList(newList);
    }

    return(
        <>
            <div className="div-course">
                <div className="div-course-list-name">
                    {courseName}
                </div>
                <div className="div-course-list-credits">
                    <div>{courseCredits}</div>
                    <div className="div-course-list-credits-txt"> {keyword}</div>
                </div>
                <div className="div-course-list-btn">
                    <button className="btn-course-list">
                        <TrashImage color="white" size="30" onClick={removeCourse}/>
                    </button>
                </div>
            </div>
        </>
    )
}
