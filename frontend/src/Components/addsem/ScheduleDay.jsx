import "./ScheduleDay.css"
import { ScheduleAdd } from "./ScheduleAdd";
import { useState } from "react";
export function ScheduleDay({courseList,setCourseList})
{
    const [daySelected,setDaySelected]=useState('mon');
    const dayList=["Mon","Tue","Wed","Thu","Fri"];
    const [sameChecked, setSameChecked] = useState(false);
    const [showEntryForm, setShowEntryForm] = useState(false);
    return(
        <>
            <div className={showEntryForm?"div-schedule-day-header blurred":"div-schedule-day-header"}>
                Add your Schedule
            </div>
            <div className={showEntryForm?"div-schedule-day-container blurred":"div-schedule-day-container"}>

                <div className="div-schedule-day-checker">
                    <input type="checkbox" id="same" name="same" value="yes"
                    style={{width:'18px',height:'18px'}}
                    onChange={(event)=>{setSameChecked(event.target.checked)}}
                    />
                    <label htmlFor="same">All days have same schedule. </label>
                </div>

                <div className="div-schedule-day">
                {dayList.map(day=>{
                    return(
                        <div key={day}>
                            <button className={sameChecked?"btn-schedule-day btn-clicked":daySelected==day.toLowerCase()?"btn-schedule-day btn-clicked"
                                :"btn-schedule-day"
                            } 
                                onClick={()=>{!sameChecked&&setDaySelected(day.toLowerCase())}}
                            >
                                {day}
                            </button>
                        </div>
                    )
                })}
                </div>

                <div className="div-schedule-day-info">
                    Leave out the free hours.
                </div>

            </div>
            <div>
            <ScheduleAdd courseList={courseList} setCourseList={setCourseList} day={sameChecked?"mon":daySelected}
                    showEntryForm={showEntryForm}
                    setShowEntryForm={setShowEntryForm}
                    
                    />
            </div>
            
        </>
    )
}