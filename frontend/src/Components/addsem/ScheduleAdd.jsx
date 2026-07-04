import "./ScheduleAdd.css"
import { ButtonAddCourse } from "./ButtonAddCourse"
import { EntryForm } from "./EntryForm";
import { CourseListContainer } from "./CourseListContainer";


export function ScheduleAdd({courseList,setCourseList,day,showEntryForm,setShowEntryForm})
{
    function trashFunction(index)
    {
        courseList[index][day]=0;
        const newList =[...courseList];
        setCourseList(newList);
    }
  
    const dropdown2=["x 1","x 2","x 3"];
    function toggleShowEntryForm()
    {
        setShowEntryForm(!showEntryForm);
    }
    return(
        <>
            <div style={{position:"relative",display:"flex",justifyContent:"center"}}>
            {showEntryForm&&
                    <EntryForm toggleShowEntryForm={toggleShowEntryForm}
                                courseList={courseList}
                                setCourseList={setCourseList}
                                dropdown1={true}
                                dropdown2={dropdown2}
                                day={day}
                                />
                    }
            </div>

        <div className={showEntryForm?"div-btn-schedule-add blurred":"div-btn-schedule-add"}>
        <ButtonAddCourse text="+ Add Hours" toggleShowEntryForm={toggleShowEntryForm}/>
        </div>
        
        
        {courseList.length>0&&<div className={showEntryForm?"blurred":""}>
                                <CourseListContainer courseList={courseList} 
                                setCourseList={setCourseList}
                                property2={day}
                                trashFunction={trashFunction}
                                />
                                </div>}
        </>
    )
}