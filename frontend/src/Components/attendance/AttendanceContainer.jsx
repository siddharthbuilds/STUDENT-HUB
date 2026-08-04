import "./AttendanceContainer.css"
import {AttendanceDetails} from "./AttendanceDetails"
export function AttendanceContainer({courseSummary}){
    return(
        <div className="div-attendance-container">
            {courseSummary.map(course=>

                <AttendanceDetails
                    key={course.courseId}
                    course={course.course_name}
                    total={course.total_hours}
                    present={course.total_present}
                    absent={course.total_absent}
                    bunks={course.remainingBunks}
                    percentage={
                        (course.total_present/course.total_hours*100).toFixed(1)
                    }

                />

            )}
        </div>
    )
}