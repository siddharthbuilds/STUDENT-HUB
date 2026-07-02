import {Input} from "../Components/login/Input.jsx"
import "./AddSemPage.css"
import { AddCourse } from "../Components/addsem/AddCourse.jsx"
import { ButtonLogin } from "../Components/login/ButtonLogin.jsx"
import { ScheduleDay } from "../Components/addsem/ScheduleDay.jsx"
import {SatSchedule} from "../Components/addsem/SatSchedule.jsx"
import getSatDates from "../Utils/Dates.js"
import { useState } from "react"
export function AddSemPage()
{
    const [courseList,setCourseList] = useState([]);
    const [semStartDate,setSemStartDate]=useState(null);
    const [semEndDate,setSemEndDate]=useState(null);
    function clickStartDate(event)
    {
        setSemStartDate(event.target.value);
    }
    function clickEndDate(event)
    {
        setSemEndDate(event.target.value);
    }
    const satDates = semStartDate&&semEndDate&&getSatDates(semStartDate,semEndDate);
    return(
        <>
            <div className="div-addsem-page">
                <div className="div-option-cancel-addsem">
                    <ButtonLogin text="Cancel" bad={true} />
                </div>
                <div className="div-option-save-addsem">
                    <ButtonLogin text="Save" bad={false} />
                </div>
                <div>
                   <Input placeholder="Semester Label (eg: Semester 1)" 
                    type="text"
                    fontSize="30"
                    backgroundColor="#12193A"
                    /> 
                </div>
                <div className="div-addsem-dates">
                    <div className="div-addsem-eachdate">
                        <Input placeholder="Start Date" 
                        type="date"
                        fontSize="23"
                        backgroundColor="#12193A"
                        onChange={clickStartDate}
                        />
                        <div>Semester Start Date </div>
                    </div>
                    <div className="div-addsem-eachdate">
                        <Input placeholder="End Date" 
                        type="date"
                        fontSize="23"
                        backgroundColor="#12193A"
                        onChange={clickEndDate}
                        />
                        <div>Semester End Date </div>
                    </div>
                </div>
                <hr style={{width:'100%',margin:'0'}}></hr>
                <div>
                    <AddCourse courseList={courseList} setCourseList={setCourseList}/>
                </div>
                <hr style={{width:'100%',margin:'0'}}></hr>
                <div>
                    <ScheduleDay courseList={courseList} setCourseList={setCourseList}/>
                </div>
                <hr style={{width:'100%',margin:'0'}}></hr>
                {satDates&&<div>
                    <SatSchedule satDates={satDates}/>
                </div>}
            </div>
            
            
        </>
    )
}