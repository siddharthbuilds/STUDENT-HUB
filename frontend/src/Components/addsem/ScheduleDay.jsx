import "./ScheduleDay.css"
import { ScheduleAdd } from "./ScheduleAdd";
import { useState } from "react";
export function ScheduleDay({courseList,setCourseList})
{
    const [daySelected,setDaySelected]=useState('mon');
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
                        <button className={daySelected==day.toLowerCase()?"btn-schedule-day btn-clicked"
                            :"btn-schedule-day"
                        } 
                            onClick={()=>{setDaySelected(day.toLowerCase())}}
                        >
                            {day}
                        </button>
                    </div>
                )
            })}
            </div>
            <ScheduleAdd courseList={courseList} setCourseList={setCourseList} day={daySelected}/>
            
        </>
    )
}