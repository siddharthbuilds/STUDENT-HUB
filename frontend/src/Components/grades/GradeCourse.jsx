import "./GradeCourse.css";

export function GradeCourse({data}) {
    return (
        <div className="div-grades-details">

            <div className="div-grades-course">
                {data.map(course=>{
                    return(
                        <>
                            <div className="div-grades-coursename">
                                {course.courseName}
                            </div>

                            <div className="div-grades-coursegrade">
                                {course.grade}
                            </div>
                        </>
                    )
                })}
                

            </div>

        </div>
    );
}