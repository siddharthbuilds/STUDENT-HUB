import "./CourseListContainer.css"
import { CourseList } from "./CourseList.jsx"
export function CourseListContainer({courseList,setCourseList,keyword=""})
{
   
    return(
        <>
        <div className="div-course-list">
            {courseList.map((course,index)=>{
                return(<CourseList 
                    key={course.courseName}
                    courseName={course.courseName}
                    courseCredits={course.courseCredits}
                    courseList={courseList}
                    setCourseList={setCourseList}
                    index={index}
                    keyword={keyword}
                />)
                
            })}
        </div>
            
        </>
    )
    
        
}