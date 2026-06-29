import "./ButtonAddCourse.css"

export function ButtonAddCourse({toggleShowCourseBox,text})
{
    return(
        <>
        <div>
            <button className="btn-addcourse" 
                onClick={toggleShowCourseBox}> {text}
            </button>
        </div>
        </>
    )
}