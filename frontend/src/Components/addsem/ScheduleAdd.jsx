import "./ScheduleAdd.css"
import { ButtonAddCourse } from "./ButtonAddCourse"
import { CourseBox } from "./CourseBox";
import { CourseListContainer } from "./CourseListContainer";


export function ScheduleAdd({courseList,setCourseList,day,showCourseBox,setShowCourseBox})
{
    function trashFunction(index)
    {
        courseList[index][day]=0;
        const newList =[...courseList];
        setCourseList(newList);
    }
  
    const dropdown2=["x 1","x 2","x 3"];
    function toggleShowCourseBox()
    {
        setShowCourseBox(!showCourseBox);
    }
    return(
        <>
            <div style={{position:"relative",display:"flex",justifyContent:"center"}}>
            {showCourseBox&&
                    <CourseBox toggleShowCourseBox={toggleShowCourseBox}
                                courseList={courseList}
                                setCourseList={setCourseList}
                                dropdown1={true}
                                dropdown2={dropdown2}
                                day={day}
                                />
                    }
            </div>

        <div className={showCourseBox?"div-btn-schedule-add blurred":"div-btn-schedule-add"}>
        <ButtonAddCourse text="+ Add Hours" toggleShowCourseBox={toggleShowCourseBox}/>
        </div>
        
        
        {courseList.length>0&&<div className={showCourseBox?"blurred":""}>
                                <CourseListContainer courseList={courseList} 
                                setCourseList={setCourseList}
                                property2={day}
                                trashFunction={trashFunction}
                                />
                                </div>}
        </>
    )
}