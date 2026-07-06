import {Input} from "../Components/login/Input.jsx"
import "./AddSemPage.css"
import { AddCourse } from "../Components/addsem/AddCourse.jsx"
import { ButtonLogin } from "../Components/login/ButtonLogin.jsx"
import { ScheduleDay } from "../Components/addsem/ScheduleDay.jsx"
import { ExamSection } from "../Components/addsem/ExamSection.jsx"
import {SatSchedule} from "../Components/addsem/SatSchedule.jsx"
import getSatDates from "../Utils/SatDates.js"
import { useState } from "react"
import { useEffect } from "react"
export function AddSemPage()
{
    const [semName,setSemName] = useState('');
    const [courseList,setCourseList] = useState([]);
    const [examList,setExamList]=useState([]);
    const [holidayList,setHolidayList]=useState([]);
    const [semStartDate,setSemStartDate]=useState(null);
    const [semEndDate,setSemEndDate]=useState(null);
    const [satDates,setSatDates] = useState([]);
    useEffect(() => {
    if (semStartDate && semEndDate) {
        setSatDates(getSatDates(semStartDate, semEndDate));
    }
    }, [semStartDate, semEndDate]);

    const filteredList = satDates.filter(saturday =>
        {const isHoliday = holidayList.some(holiday =>
            saturday.date >= holiday.from &&
            saturday.date <= holiday.to
        );
        const isExam = examList.some(exam =>
            saturday.date >= exam.from &&
            saturday.date <= exam.to
        );
        return !isExam && !isHoliday;
        }
    );

    function clickStartDate(event)
    {
        setSemStartDate(event.target.value);
         
    }
    function clickEndDate(event)
    {
        setSemEndDate(event.target.value);
    }

    function trackSemName(event)
    {
        setSemName(event.target.value);
    }
    
    const semDetails =[
        {
            semName: semName,
            startDate: semStartDate,
            endDate: semEndDate,
            courses: courseList,
            exams: examList,
            holidays: holidayList,
            saturdays: filteredList
        }
    ]
   
    return(
        <>
            <div className="div-addsem-page">
                <div className="div-option-cancel-addsem">
                    <ButtonLogin text="Cancel" alert={true} />
                </div>
                <div className="div-option-save-addsem">
                    <ButtonLogin text="Save" alert={false} 
                    onClick={()=>{
                        console.log(semDetails);
                    }}
                    />
                </div>
                <div>
                   <Input placeholder="Semester Label (eg: Semester 1)" 
                    type="text"
                    fontSize="30"
                    backgroundColor="#12193A"
                    onChange={trackSemName}
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
                <div>
                    <ExamSection headerName="Exams" buttonName="Exam" 
                        examList={examList}
                        setExamList={setExamList}
                        />
                </div>
                <hr style={{width:'100%',margin:'0'}}></hr>
                <div>
                    <ExamSection headerName="Holidays" buttonName="Holiday"
                        examList={holidayList}
                        setExamList={setHolidayList}
                        />
                </div>
                <hr style={{width:'100%',margin:'0'}}></hr>
                {satDates&&<div>
                    <SatSchedule satDates={filteredList} setSatDates={setSatDates}/>
                </div>}
            </div>
            
            
        </>
    )
}