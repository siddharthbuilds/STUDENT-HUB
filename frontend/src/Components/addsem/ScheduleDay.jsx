import "./ScheduleDay.css"
import { ScheduleAdd } from "./ScheduleAdd";
export function ScheduleDay({courseList,setCourseList})
{
    const dayList=["Mon","Tue","Wed","Thu","Fri"];
    return(
        <>
            <div className="div-schedule-day-header">
                Add your Schedule
            </div>
            <div className="div-schedule-day">
               {dayList.map(day=>{
                return(
                    <div key={day}>
                        <button className="btn-schedule-day">
                            {day}
                        </button>
                    </div>
                )
            })}
            </div>
            <ScheduleAdd courseList={courseList} setCourseList={setCourseList}/>
            
        </>
    )
}