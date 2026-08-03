import "./EachHour.css"
export function EachHour({courses})
{
    return(
        <div className="div-attendace-hours">
                {courses.map(course=>{
                    return (
                        <div className="div-attendance-eachhour">
                            <div className="div-attendance-hourname">
                                {course.courseName}
                            </div>
                            <div className="div-attendance-hourstatus">
                                <button className={course.status==1?"btn-status status-present":
                                    course.status==-1?"btn-status status-absent":"btn-status status-undefined"
                                }></button>
                            </div>
                        </div>
                    )
                })}
                
            </div>
    )
}