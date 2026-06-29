import "./CourseList.css"
import {TrashImage} from "../home/TrashImage.jsx"
export function CourseList({courseName, courseCredits,courseList,index,setCourseList,keyword,trashFunction=null})
{
    function removeCourseFunction()
    {
        let newList = courseList.toSpliced(index,1);
        setCourseList(newList);
    }

    function removeHourFunction()
    {
        trashFunction(index);
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
                        <TrashImage color="white" size="30" onClick={trashFunction?removeHourFunction:removeCourseFunction}/>
                    </button>
                </div>
            </div>
        </>
    )
}
