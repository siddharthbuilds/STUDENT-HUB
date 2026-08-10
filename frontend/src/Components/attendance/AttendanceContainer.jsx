import "./AttendanceContainer.css"
import {AttendanceDetails} from "./AttendanceDetails"
export function AttendanceContainer({courseSummary}){
    return(
        <div className="div-attendance-container">
            {courseSummary.map(course=>
                <div key ={course.course_name}>
                <AttendanceDetails
                    course={course.course_name}
                    total={course.total_hours}
                    present={course.total_present}
                    absent={course.total_absent}
                    bunks={course.remainingBunks}
                    percentage={
                        ((parseInt(course.total_present)/
                            (parseInt(course.total_present)+parseInt(course.total_absent)))
                                *100).toFixed(1)
                    }

                />

                </div>

            )}
        </div>
    )
}