import "./CourseListContainer.css"
import { CourseList } from "./CourseList.jsx"
export function CourseListContainer({courseList,setCourseList,keyword="",property2})
{
   
    return(
        <>
        <div className="div-course-list">
            {courseList.map((course,index)=>{
                return(<CourseList 
                    key={course.courseName}
                    courseName={course.courseName}
                    courseCredits={course[property2]}
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