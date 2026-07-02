import "./CourseListContainer.css"
import { CourseList } from "./CourseList.jsx"
export function CourseListContainer({courseList,setCourseList,keyword="",property2,trashFunction=null,type=null})
{
   
    return(
        <>
        <div className="div-course-list">
            {courseList.map((course,index)=>{
                return(course[property2]!=0&&<CourseList 
                    key={course.courseName||index}
                    courseName={!type?course.courseName:`${course.from}\nto\n${course.to}`}
                    courseCredits={course[property2]}
                    courseList={courseList}
                    setCourseList={setCourseList}
                    index={index}
                    keyword={keyword}
                    trashFunction={trashFunction}
                />)
                
            })}
        </div>
            
        </>
    )
    
        
}