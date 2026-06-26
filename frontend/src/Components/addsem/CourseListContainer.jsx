import "./CourseListContainer.css"
import { CourseList } from "./CourseList.jsx"
export function CourseListContainer({courseList})
{
    return(
        <>
            {courseList.map((course)=>{
                return(<CourseList 
                    key={course.courseName}
                    courseName={course.courseName}
                    courseCredits={course.courseCredits}
                />)
                
            })}
        </>
    )
    
        
}